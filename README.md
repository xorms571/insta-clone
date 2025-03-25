# 📸 Instagram 클론 웹 앱 / Instagram Clone Web App

이 프로젝트는 **React**와 **TypeScript**를 학습하기 위해 제작한 **Instagram 클론 웹 애플리케이션**입니다.  
This project is an **Instagram clone web application** built for the purpose of learning **React** and **TypeScript**.  

기본적인 SNS 기능을 구현하면서 프론트엔드 개발 능력을 향상시키고,  
The project focuses on implementing core SNS features to enhance frontend development skills

Firebase와 같은 백엔드 서비스를 통합하는 경험을 쌓기 위해 진행했습니다.  
 and gain experience integrating backend services like Firebase.

## 🚀 주요 기능 / Features

- 회원가입 및 로그인 (Firebase Authentication)  
  **User Sign-up and Login**
- 게시글 작성 및 이미지 업로드 (Firebase Firestore & Storage)  
  **Post Creation and Image Upload**
- 게시글 피드 및 댓글 기능  
  **Feed Display and Commenting System**
- 반응형 UI 및 기본적인 애니메이션 (React Spring, Swiper)  
  **Responsive UI and Basic Animations**
- 사용자 프로필 관리 기능  
  **User Profile Management**
- React Router를 통한 페이지 라우팅  
  **Page Routing with React Router**
- 타입스크립트 기반 프로젝트 설계 및 구현  
  **Type-safe Project Structure with TypeScript**

## 📌 개선할 점 및 보완할 기능

### 🔹 기능 개선 및 추가 예정
- **무한 스크롤 기능**: 현재 페이지네이션 방식으로 구현되어 있으며, 더 부드러운 사용자 경험을 위해 무한 스크롤 적용이 필요합니다.  
- **낙관적 업데이트 적용**: 좋아요, 댓글 등의 반응이 즉시 UI에 반영되지 않아 UX가 다소 불편합니다.  
  → API 응답을 기다리지 않고 UI를 먼저 업데이트하는 방식으로 개선할 예정입니다.  
- **전역 상태 관리 도입**: 현재 개별 컴포넌트 단위에서 상태를 관리하고 있어, 데이터 공유 및 상태 변경 시 불편함이 있습니다.  
  → Redux 또는 Zustand 등의 전역 상태 관리 라이브러리를 도입하여 성능을 개선할 계획입니다.  

### 🔹 미완성 기능  
- **좋아요한 포스트 페이지** 🏷️  
  - 사용자가 ‘좋아요’ 버튼을 누른 게시물만 모아서 볼 수 있는 페이지 구현이 필요합니다.  
- **구독한 포스트 페이지** 📌  
  - 사용자가 구독한 계정의 게시물만 볼 수 있도록 구독 시스템을 완성해야 합니다.  
- **공유 기능 추가** 🔗  
  - 특정 게시물을 다른 사용자와 공유할 수 있도록 공유 기능을 추가해야 합니다.  
  - 예: 링크 복사, SNS 공유 버튼 제공  
