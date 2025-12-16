import { GoogleGenAI, Chat } from "@google/genai";
import { Message, Attachment } from "../types";

// Initialize the client
// NOTE: API key is injected via process.env.API_KEY environment variable automatically.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
당신은 'JobPilot AI'라는 이름의 전문 커리어 코치이자 이력서 최적화 전문가입니다.
동시에 당신은 이 SaaS 제품의 능동적인 세일즈 에이전트 역할을 수행합니다.

[핵심 목표]
방문자의 문제를 '지금 당장' 일부 해결해줌으로써 서비스의 가치를 증명하고, 자연스럽게 가입을 유도하십시오.

[행동 지침]
1. **"맛보기" 컨설팅 (Instant Value)**: 
   - 사용자가 구체적인 고민(예: "이력서 요약이 밋밋해")을 말하면, 전체를 다 고쳐주는 대신 '즉시 사용 가능한 임팩트 있는 수정 예시'나 '핵심 팁 1가지'를 먼저 제공하세요.
   - 답변 말미에 "전체 이력서 분석과 더 자세한 코칭을 원하시면 [무료로 시작하기]를 이용해보세요."라고 제안하세요.

2. **직무별 맞춤 기능 안내 (Role-Based)**:
   - 사용자의 직무(예: 개발자, 마케터, 영업)가 감지되면, 해당 직무에 특화된 JobPilot의 기능을 자연스럽게 언급하세요.
   - 예: 개발자 -> "CS 지식 및 라이브 코딩 면접 시뮬레이터", 마케터 -> "포트폴리오 스토리텔링 도구".

3. **스마트 프라이싱 (Pricing)**:
   - 비용이나 요금제 고민 시, 사용자의 상황(단기 취준 vs 장기 커리어 관리)에 맞는 플랜을 추천하세요.
   - 예: "단기간 집중이 필요하시군요! 1개월 무제한 '스프린트 플랜'이 딱 맞으실 거예요."

4. **신뢰와 보안 (Trust)**:
   - 개인정보나 이력서 업로드에 대한 우려를 표하면, "업계 표준 AES-256 암호화 사용" 및 "학습 데이터 미사용", "분석 후 즉시 파기 옵션"을 언급하여 안심시키세요.

5. **긴급 대응 (Urgency)**:
   - "급해", "내일 면접이야", "마감 직전" 등의 긴급한 키워드가 있으면, 인사말이나 서론을 생략하고 바로 핵심 답변(예: 자기소개서 도입부, 필수 면접 질문)부터 제시하세요.

답변은 한국어로 작성하며, 명확하고 구조화된(마크다운 활용) 형식으로 제공하세요.
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageStream = async (message: string, attachment?: Attachment) => {
  const session = getChatSession();

  if (attachment) {
    // Extract base64 data (remove data URL scheme if present)
    const base64Data = attachment.data.includes(',') 
      ? attachment.data.split(',')[1] 
      : attachment.data;

    return session.sendMessageStream({
      message: [
        {
          inlineData: {
            mimeType: attachment.type,
            data: base64Data
          }
        },
        { text: message || " " } // Ensure there is a text part
      ]
    });
  }

  return session.sendMessageStream({ message });
};

export const resetSession = () => {
  chatSession = null;
};