import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Shield, 
  BarChart, 
  Briefcase, 
  FileText, 
  MessageSquare,
  Bot
} from './ui/Icons';
import ChatInterface from './ChatInterface';

interface LandingPageProps {
  onLaunchApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary-600 text-white p-1.5 rounded-lg">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="font-bold text-xl text-slate-900">JobPilot</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition">기능 소개</a>
            <a href="#demo" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition">데모 체험</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition">요금제</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button onClick={onLaunchApp} className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block">로그인</button>
            <button 
              onClick={onLaunchApp}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              무료로 시작하기
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-medium mb-6 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-primary-600 mr-2"></span>
              새로운 AI 이력서 분석 엔진 v2.5 업데이트
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              AI로 완성하는<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">당신의 커리어 넥스트 레벨</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              JobPilot은 최신 생성형 AI를 활용하여 이력서 최적화부터 실전 모의 면접까지,
              취업 준비의 모든 과정을 1:1로 코칭해주는 스마트 에이전트입니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
              <button 
                onClick={onLaunchApp}
                className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 transition transform hover:-translate-y-1 flex items-center justify-center group"
              >
                지금 무료로 분석받기
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={20} />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold transition flex items-center justify-center">
                <Bot className="mr-2 text-slate-500" size={20} />
                데모 영상 보기
              </button>
            </div>
            
            {/* Hero Dashboard Preview */}
            <div className="relative max-w-5xl mx-auto mt-12 shadow-2xl rounded-2xl border border-slate-200 bg-white p-2">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white/50 z-20 pointer-events-none"></div>
              <img 
                src="https://picsum.photos/1200/800" 
                alt="Dashboard Preview" 
                className="rounded-xl w-full h-auto object-cover opacity-90" 
              />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200 shadow-xl flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600">J</div>
                  <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-xs font-bold text-green-600">A</div>
                  <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-xs font-bold text-purple-600">M</div>
                </div>
                <span className="text-sm font-medium text-slate-700">10,000+ 명의 합격자가 선택했습니다</span>
              </div>
            </div>
          </div>
        </section>

        {/* Live Demo Section - Directly embedded */}
        <section id="demo" className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  지금 바로 AI 에이전트와<br />
                  <span className="text-primary-600">대화를 시작해보세요</span>
                </h2>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                  별도의 가입 없이도 JobPilot의 핵심 기능을 체험해보실 수 있습니다.
                  "내 이력서 요약해줘" 또는 "마케터 면접 질문 뽑아줘"라고 물어보세요.
                  강력한 Gemini 모델이 실시간으로 답변해드립니다.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "실시간 이력서 분석 및 피드백",
                    "직무별 맞춤형 면접 질문 생성",
                    "커리어 패스 설계 및 조언",
                    "자기소개서 초안 작성 보조"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-slate-700">
                      <CheckCircle2 className="text-green-500 mr-3" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={onLaunchApp}
                  className="hidden lg:inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition"
                >
                  전체 기능 살펴보기 <ArrowRight className="ml-2" size={18} />
                </button>
              </div>
              <div className="lg:w-1/2 w-full h-[600px]">
                {/* Embedded Chat Interface */}
                <ChatInterface />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase mb-2">Features</h2>
              <p className="text-3xl font-bold text-slate-900 mb-4">취업 성공을 위한 올인원 툴킷</p>
              <p className="text-slate-600">단순한 교정을 넘어, 합격 확률을 높이는 전략적인 인사이트를 제공합니다.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<FileText className="text-blue-600" size={24} />}
                title="스마트 이력서 분석"
                description="ATS(채용 관리 시스템) 기준에 맞춰 키워드를 최적화하고, 가독성을 높이는 레이아웃을 제안합니다."
              />
              <FeatureCard 
                icon={<MessageSquare className="text-purple-600" size={24} />}
                title="실전 모의 면접"
                description="직무와 경력에 맞는 예상 질문을 생성하고, 답변에 대한 구체적인 피드백과 개선점을 제공합니다."
              />
              <FeatureCard 
                icon={<Briefcase className="text-green-600" size={24} />}
                title="맞춤형 채용 공고 매칭"
                description="사용자의 스킬셋과 경험을 분석하여 합격 가능성이 높은 채용 공고를 우선적으로 추천해 드립니다."
              />
              <FeatureCard 
                icon={<BarChart className="text-orange-600" size={24} />}
                title="커리어 성장 리포트"
                description="현재 역량 수준을 시각화하고, 부족한 스킬을 보완할 수 있는 구체적인 학습 로드맵을 제시합니다."
              />
              <FeatureCard 
                icon={<Shield className="text-teal-600" size={24} />}
                title="개인정보 안심 보호"
                description="모든 데이터는 암호화되어 저장되며, 사용자의 동의 없이 외부로 공유되지 않습니다."
              />
              <FeatureCard 
                icon={<Zap className="text-yellow-600" size={24} />}
                title="초고속 초안 생성"
                description="자기소개서, 커버레터, 포트폴리오 설명 등 작성이 어려운 문서를 몇 초 만에 생성하세요."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">준비된 인재가 되는 가장 빠른 길</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              지금 바로 10,000명의 구직자들이 사용하고 있는 JobPilot을 경험해보세요.<br/>
              신규 가입 시 프리미엄 기능을 7일간 무료로 제공합니다.
            </p>
            <button 
              onClick={onLaunchApp}
              className="bg-primary-600 hover:bg-primary-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-900/50 transition transform hover:-translate-y-1"
            >
              무료로 시작하기
            </button>
            <p className="mt-6 text-sm text-slate-500">신용카드 정보 입력 없이 바로 시작할 수 있습니다.</p>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg">
              <Zap size={16} fill="currentColor" />
            </div>
            <span className="font-bold text-lg text-slate-900">JobPilot</span>
          </div>
          <div className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} JobPilot AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-100/50 transition duration-300 group">
    <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">
      {description}
    </p>
  </div>
);

export default LandingPage;