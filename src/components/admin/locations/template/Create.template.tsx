import { Button, Input, Shelf } from "fast-jsx";
import { cn } from "fast-jsx/util";
import { useState } from "react";
import { LocationCreate } from "@/types/Location";

export default function CreateTemplate({
  post,
}: {
  post: (data: LocationCreate) => void;
}) {
  const [name, setName] = useState<string>();
  const [sizeLimit, setSizeLimit] = useState<string>();

  const handleSubmit = () => {
    if (!name || !sizeLimit) return;

    post({
      locationName: name,
      sizeLimit: +sizeLimit,
    });
  };

  const cardStyles = {
    base: "flex flex-col bg-white border border-gray-100 overflow-hidden",
    rounded: "rounded-xl",
    shadow: "shadow-card",
    body: "flex flex-col p-6 md:p-8",
    header:
      "flex flex-row justify-between items-center p-4 border-b border-gray-100",
    title: "text-lg font-semibold text-gray-900",
  };

  const formStyles = {
    group: "flex flex-col gap-4",
    label: "text-sm font-medium text-gray-700",
    input:
      "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kw-brown/20",
    submitButton:
      "mt-6 w-full bg-kw-brown text-white px-4 py-3 rounded-lg hover:bg-kw-brown/90 transition-colors font-medium",
  };

  return (
    <Shelf.Col
      option={{
        boundary: cn(cardStyles.base, cardStyles.rounded, cardStyles.shadow),
      }}
    >
      <Shelf.Row
        option={{
          boundary: cardStyles.header,
        }}
      >
        <h2 className={cardStyles.title}>강의실 등록</h2>
      </Shelf.Row>
      <Shelf.Col
        option={{
          boundary: cardStyles.body,
          display: formStyles.group,
        }}
      >
        <Shelf.Col>
          <label className={formStyles.label}>강의실 이름</label>
          <Input
            state={[name, setName]}
            placeholder="강의실 이름"
            option={{
              boundary: formStyles.input,
            }}
          />
        </Shelf.Col>
        <Shelf.Col>
          <label className={formStyles.label}>수용 인원</label>
          <Input
            state={[sizeLimit, setSizeLimit]}
            placeholder="수용 인원"
            type="number"
            option={{
              boundary: formStyles.input,
            }}
          />
        </Shelf.Col>

        <Button
          title="등록"
          onClick={handleSubmit}
          option={{
            boundary: formStyles.submitButton,
          }}
        />
      </Shelf.Col>
    </Shelf.Col>
  );
}
