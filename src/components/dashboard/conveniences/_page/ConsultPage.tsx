import { useState } from 'react';
import { useAiStore } from '@/store/aiStore';
import useAi from '@/hook/useAi';
import { Message } from '@/types/Grok';
import { CONSULT_TOPICS, ContextType } from '@/asset/prompt';
import useLecture from '@/hook/useLecture';

export default function ConsultPage() {
  const [context, setContext] = useState<ContextType>('neutral');
  const [selectedTopic, setSelectedTopic] = useState<'CAREER' | 'STUDY' | 'RELATIONSHIP'>('CAREER');
  const [userInput, setUserInput] = useState('');
  const { topics } = useAiStore();
  const { mutate, isLoading } = useAi();

  const { studentLectures } = useLecture();

  // 등급이 있는 과목만 필터링
  const gradedLectures = studentLectures?.filter(
    (lecture) => lecture.grade && lecture.grade !== "IN_PROGRESS" && lecture.grade !== "P" && lecture.grade !== "NP"
  );

  const handleSubmit = (context?: ContextType) => {
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
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">AI 학생 상담</h1>
        <select id="context" onChange={(e) => setContext(e.target.value as ContextType)} className="p-2 border border-gray-300 rounded">
          <option value="neutral">중립적</option>
          <option value="warm"> 따뜻하게</option>
          <option value="cold"> 차갑게</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {Object.entries(CONSULT_TOPICS()).map(([key, { title }]) => (
          <button
            key={key}
            onClick={() => setSelectedTopic(key as 'CAREER' | 'STUDY' | 'RELATIONSHIP')}
            className={`p-4 rounded-lg ${selectedTopic === key ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            {title}
          </button>
        ))}
      </div>
      {selectedTopic === 'STUDY' && gradedLectures && gradedLectures.length > 0 && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-3">현재 성적 현황</h3>
          <div className="space-y-2">
            {gradedLectures.map((lecture) => (
              <div key={lecture.lectureId} className="flex justify-between items-center">
                <span className="text-gray-600">{lecture.courseResponseDto.courseName}</span>
                <span className={`font-medium ${lecture.grade === 'F' ? 'text-red-500' : lecture.grade?.startsWith('A') ? 'text-green-500' : 'text-gray-900'}`}>
                  {lecture.grade}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTopic && (
        <div className="space-y-6">
          <div className="space-y-4">
            {topics[selectedTopic]?.map((message: Message, index: number) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'} max-w-[80%]`}
              >
                {message.content}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSubmit(context)}
              className="flex-1 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="메시지를 입력하세요..."
              disabled={isLoading}
            />
            <button
              onClick={() => handleSubmit(context)}
              className={`px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
              disabled={isLoading}
            >
              {isLoading ? '응답 중...' : '전송'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}