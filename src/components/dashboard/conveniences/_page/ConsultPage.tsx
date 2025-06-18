import { useState, useRef, useEffect } from 'react';
import { useAiStore } from '@/store/aiStore';
import useAi from '@/hook/useAi';
import { Message } from '@/types/Grok';
import { CONSULT_TOPICS, ContextType } from '@/asset/prompt';
import { CONTEXT_OPTIONS } from '@/constants/contexts';
import { TOPIC_OPTIONS } from '@/constants/topics';
import { RELATIONSHIP_QUOTES } from "@/constants/quotes";
import useLecture from '@/hook/useLecture';

export default function ConsultPage() {
  const [context, setContext] = useState<ContextType>('neutral');
  const [selectedTopic, setSelectedTopic] = useState<'CAREER' | 'STUDY' | 'RELATIONSHIP'>('CAREER');
  const { topics, clearTopic } = useAiStore();
  const { mutate, isLoading } = useAi();
  const [userInput, setUserInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (selectedTopic) {
      scrollToBottom();
    }
  }, [selectedTopic, topics]);

  const { studentLectures } = useLecture();

  // 등급이 있는 과목만 필터링
  const gradedLectures = studentLectures?.filter(
    (lecture) => lecture.grade && lecture.grade !== "IN_PROGRESS" && lecture.grade !== "P" && lecture.grade !== "NP"
  );

  const handleSubmit = async (context?: ContextType) => {
    scrollToBottom();
    if (!userInput.trim()) return;
    const grades = gradedLectures?.map(lecture =>
      `${lecture.courseResponseDto.courseName}: ${lecture.grade}`
    ).join('\n');

    const systemPrompt: Message = {
      role: 'system' as const,
      content: selectedTopic === 'STUDY'
        ? `${CONSULT_TOPICS(context)[selectedTopic].prompt}\n\n학생의 현재 성적 정보:\n${grades}`
        : CONSULT_TOPICS(context)[selectedTopic].prompt
    }
    const userMessage: Message = {
      role: 'user' as const,
      content: userInput
    };
    const currentMessages = topics[selectedTopic] || [];
    mutate({
      topic: selectedTopic,
      messages: [systemPrompt, ...currentMessages.slice(-6), userMessage]
    });
    setUserInput('');
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-2rem)] flex flex-col bg-gray-50 overflow-hidden">
      <div className="p-6 bg-white border-b">
        <h1 className="text-2xl font-bold">AI 학생 상담</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 p-6 bg-white border-b">
        {CONTEXT_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => setContext(option.value)}
            className={`relative p-4 rounded-lg transition-all duration-200 ${context === option.value
              ? 'bg-blue-500 text-white shadow-lg scale-105'
              : 'bg-gray-50 hover:bg-gray-100'}`}
          >
            <div className="text-2xl mb-2">{option.icon}</div>
            <div className="font-medium mb-1">{option.label}</div>
            <div className={`text-xs ${context === option.value ? 'text-blue-100' : 'text-gray-500'}`}>
              {option.description}
            </div>
            {context === option.value && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            )}
          </button>
        ))}
      </div>
      <div className="p-6 bg-white border-b">
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {TOPIC_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedTopic(option.value as 'CAREER' | 'STUDY' | 'RELATIONSHIP')}
              className={`relative p-4 rounded-xl border-2 transition-all hover:shadow-md
                ${selectedTopic === option.value
                  ? 'border-blue-500 bg-blue-500 text-white shadow-md transform scale-[1.02]'
                  : 'border-gray-200 hover:border-blue-200'}`}
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <div className="font-medium mb-1">{option.label}</div>
              <div className="text-sm opacity-80">{option.description}</div>
              {selectedTopic === option.value && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                  선택됨
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      {(selectedTopic === 'STUDY' || selectedTopic === 'CAREER') && gradedLectures && gradedLectures.length > 0 && (
        <div className="mx-6 p-4 bg-white rounded-lg border shadow-sm h-[170px] overflow-y-scroll">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">현재 성적 현황</h3>
            <button
              onClick={() => clearTopic(selectedTopic)}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-md border border-gray-200 hover:border-red-200 transition-all flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              대화 초기화
            </button>
          </div>
          <div className="space-y-2">
            {gradedLectures.map((lecture) => (
              <div key={lecture.lectureId} className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                <span className="text-gray-600">{lecture.courseResponseDto.courseName}</span>
                <span className={`font-medium ${lecture.grade === 'F' ? 'text-red-500' : lecture.grade?.startsWith('A') ? 'text-green-500' : 'text-gray-900'}`}>
                  {lecture.grade}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTopic === 'RELATIONSHIP' && (
        <div className="mx-6 p-4 bg-white rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">오늘의 명언</h3>
            <button
              onClick={() => clearTopic(selectedTopic)}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-md border border-gray-200 hover:border-red-200 transition-all flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              대화 초기화
            </button>
          </div>
          {(() => {
            const randomQuote = RELATIONSHIP_QUOTES[Math.floor(Math.random() * RELATIONSHIP_QUOTES.length)];
            return (
              <div className="text-center p-2">
                <p className="text-lg text-gray-700 italic mb-2">"{randomQuote.text}"</p>
                <p className="text-sm text-gray-500">- {randomQuote.author}</p>
              </div>
            );
          })()}
        </div>
      )}
      <div className="flex-1 min-h-0 flex flex-col relative overflow-hidden">
        {selectedTopic ? (
          <>
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto bg-white">
              <div className="max-w-3xl mx-auto space-y-6 px-6 py-8">
                {topics[selectedTopic]?.map((message: Message, index: number) => (
                  <div
                    key={index}
                    className={`group flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`relative px-5 py-4 rounded-2xl shadow-sm transition-all
                      ${message.role === 'user'
                        ? 'bg-blue-500 text-white ml-12'
                        : 'bg-white border border-gray-200 mr-12'}
                      max-w-[80%] hover:shadow-md`}
                    >
                      <div className={`absolute ${message.role === 'user' ? '-right-1.5' : '-left-1.5'} bottom-[1.15rem] transform ${message.role === 'user' ? 'rotate-[30deg]' : '-rotate-[30deg]'} w-3 h-3 overflow-hidden`}>
                        <div className={`absolute inset-0 transform ${message.role === 'user' ? '-rotate-[60deg]' : 'rotate-[60deg]'} origin-top-left
                          ${message.role === 'user' ? 'bg-blue-500' : 'bg-white border-l border-t border-gray-200'}`} />
                      </div>
                      <div className={message.role === 'user' ? 'text-white' : 'text-gray-800'}>{message.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t shadow-lg">
              <div className="max-w-3xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium">{TOPIC_OPTIONS.find(t => t.value === selectedTopic)?.label}</h3>
                  <button
                    onClick={() => clearTopic(selectedTopic)}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-md border border-gray-200 hover:border-red-200 transition-all flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    대화 초기화
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSubmit(context)}
                    className="w-full p-4 pr-24 rounded-full border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-all"
                    placeholder="메시지를 입력하세요..."
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSubmit(context)}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-full
                      focus:outline-none transition-all transform active:scale-95
                      ${isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 hover:shadow-md'}
                      text-white font-medium`}
                    disabled={isLoading}
                  >
                    {isLoading ? '응답 중...' : '전송'}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}