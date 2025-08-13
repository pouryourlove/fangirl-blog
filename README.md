# :pushpin: FANGIRL BLOG
> 좋아하는 것들을 카테고리별로 정리해 꾸준히 기록하는 팬심 기록 공간
><https://fangirl-blog-server.vercel.app>

</br>

## 1. 프로젝트 소개 & 목표

### 기획 의도
좋아하는 것들이 많아질수록 “어디에, 어떻게 남길지”가 과제가 되었습니다. 그래서 카테고리/검색/발행·드래프트/댓글 승인을 갖춘 블로그를 만들었습니다.

### 주요 목표
- 덕질 기록 아카이빙: 좋아하는 것들을 카테고리별로 정리·검색·탐색
- 발행 워크플로우: 에디터로 글 작성 → 썸네일 업로드 → 발행/드래프트 관리
- 커뮤니티 안전성: 댓글 승인 기반 모더레이션으로 건전한 소통 유지
- 운영 효율: 대시보드에서 게시글/댓글/드래프트 통계 및 최신 글 관리
- 사용자 경험: 반응형 레이아웃, 빠른 이미지 로딩, 직관적 탐색 UX

### 기술적 목표
- 풀스택 설계: React(Vite) + Express + MongoDB(Mongoose)로 CRUD/모델링 구현
- 인증/권한: JWT 기반 관리자 보호, 라우팅 가드로 어드민 구역 통제
- 에디터·업로드 파이프라인: Quill 리치텍스트 + Multer 업로드 + ImageKit 변환(webp/auto quality/resize)
- 상태·네트워킹: Context API로 전역 토큰/axios 기본 헤더 관리, 토스트 기반 에러/로딩 피드백
- API 아키텍처: 라우트–컨트롤러–모델 분리, REST 규약 준수, 공개/관리자 엔드포인트 분리
- 퍼포먼스: 이미지 CDN 최적화, CORS/환경변수 분리 
  
## 2. 사용 기술

### 프론트엔드 핵심 기술
| 기술 | 버전 | 사용 목적 |
|------|------|-----------|
| React.js | 19.1.0 | • 컴포넌트 기반 설계로 재사용성 확보<br>• SPA 아키텍처 구현 |
| React Router | 7.6.2 | • 관리자 구역 중첩 라우팅 및 라우트 가드<br>• 동적 상세 페이지(/blog/:id) |
| Tailwind CSS | 4.1.10 | • 유틸리티 퍼스트 스타일링으로 개발 속도 향상<br>• 반응형 레이아웃 손쉬운 구성 |
| Quill | 2.0.3 | • 리치 텍스트 에디터로 본문 작성/포맷 |
| motion | 12.19.2 | • 카테고리 전환 모션 등 마이크로 인터랙션 |
| react-hot-toast | 2.5.2 | • 액션 결과(성공/실패) 실시간 피드백 |
| axios | 1.11.0 | • REST 통신 및 전역 기본 헤더 관리(Context 연계) |

### 백엔드 핵심 기술
| 기술 | 버전 | 사용 목적 |
|------|------|-----------|
| Express | 5.1.0 | • REST API 서버 및 미들웨어 구성 |
| Mongoose | 8.16.4 | •  Blog/Comment 스키마 설계 및 ODM |
| jsonwebtoken | 9.0.2 | • 관리자 인증(JWT) 및 보호 라우트|
| Multer | 2.0.2 | • 이미지 업로드(멀티파트) 처리 |
| ImageKit SDK | 6.0.0 | • 이미지 업로드·변환(webp/품질/리사이즈) |
| cors | 2.8.5 | • 프론트-백엔드 도메인 분리 환경 CORS 허용 |
| dotenv | 17.2.0 | • 환경변수 관리(JWT/DB/ImageKit 키) |

### API
| API | 용도 | 제공 데이터 |
|-----|------|-------------|
| 백엔드 REST API | 블로그·댓글 CRUD, 관리자 기능 | • 공개: 블로그 목록/상세, 댓글 조회/작성<br>• 관리자: 로그인, 대시보드, 발행/삭제, 댓글 승인/삭제|
| ImageKit | 이미지 업로드/최적화/CDN | • webp 변환, 자동 품질, 1280px 리사이즈 URL 제공|

## 3. 주요 기능

### 3.1. 홈 검색과 카테고리 탐색
<img src="">
<details>
<summary>코드 보기</summary>
<div markdown="1">

```
// 검색어와 카테고리로 클라이언트 측 필터링
const filteredBlogs = () => {
  if (input === "") return blogs;
  return blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(input.toLowerCase()) ||
      b.category.toLowerCase().includes(input.toLowerCase())
  );
};
```
</div>
</details>

- 제목/카테고리 부분 일치로 즉시 필터링, 모션 애니메이션으로 전환감 제공.

### 3.2. 카드 → 상세 페이지 전환
<img src="">

<details>
<summary>코드 보기</summary>
<div markdown="1">

```
// 카드 요약에서 리치텍스트 일부 렌더링
<p
  className="mb-3 text-xs text-gray-600"
  dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
/>
```
</div>
</details>

- 발행일/제목/부제/카테고리/본문(리치텍스트) 제공.

### 3.3. 댓글 작성 및 승인 기반 노출
<img src="">

- 비로그인 댓글 작성 → 관리자 승인 후 상세 페이지에 노출.

### 3.4. 관리자 로그인과 라우팅 가드
<img src="">
<details>
<summary>코드 보기</summary>
<div markdown="1">

```
// 로그인 성공 시 전역 토큰/헤더 설정
setToken(data.token);
localStorage.setItem("token", data.token);
axios.defaults.headers.common["Authorization"] = data.token;
```
</div>
</details>

- 토큰 기반 보호 라우트로 /admin 이하 접근 제어.

### 3.5. 관리자 대시보드(지표/최근 글)
<img src="">

- 총 게시글/댓글/드래프트 카운트와 최근 글 테이블 제공.

### 3.6. 글 작성/발행 (이미지 최적화)
<img src="">
<details>
<summary>코드 보기(서버 업로드 최적화)</summary>
<div markdown="1">

```
// 업로드 후 변환 URL(자동 품질, webp, width=1280) 사용
const optimizedImageUrl = imagekit.url({
  path: response.filePath,
  transformation: [{ quality: "auto" }, { format: "webp" }, { width: "1280" }],
});
```
</div>
</details>

- Quill 에디터로 본문 작성, 썸네일 업로드, 드래프트/즉시 발행 관리.

### 3.7. 게시글 운영(발행 토글/삭제)
<img src="">
<details>
<summary>코드 보기</summary>
<div markdown="1">

```
// 서버: 상태 토글
blog.isPublished = !blog.isPublished;
await blog.save();

// 클라이언트: 올바른 엔드포인트 호출
await axios.post("/api/blog/toggle-publish", { id: blog._id });
```
</div>
</details>
</br>

### 3.8. AI 블로그 초안 생성(Gemini)
<details>
<summary>코드 보기</summary>
<div markdown="1">

```
// 서버: 상태 토글
// server/routes/blogRoutes.js
blogRouter.post("/generate", auth, generateContent);

// server/controllers/blogController.js
import main from "../configs/gemini.js";
export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt + " Generate a blog content for this topic in simple text format"
    );
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// server/configs/gemini.js
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
export default async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}

// 클라이언트
// client/src/pages/admin/AddBlog.jsx
import { parse } from "marked";

const generateContent = async () => {
  if (!title) return toast.error("Please enter a title");
  try {
    setLoading(true);
    const { data } = await axios.post("/api/blog/generate", { prompt: title });
    if (data.success) {
      quillRef.current.root.innerHTML = parse(data.content); // Markdown → HTML
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  } finally {
    setLoading(false);
  }
};
```
</div>
</details>
</br>

- 제목 입력 후 “Generate with AI” 클릭 시 Gemini가 초안을 생성해 Quill 에디터에 자동 삽입
관리자 전용(토큰 필요), 서버사이드 호출로 API 키 보안 유지
응답은 Markdown → HTML 변환 후 에디터에 주입, 로딩 스피너/에러 토스트로 UX 보완

### 4. 문제 해결

🔍 HTML 이스케이프로 설명이 텍스트로만 렌더링 → 신뢰 가능한 정적 데이터에 한해 dangerouslySetInnerHTML 적용 -> 이후 카드 미리보기에서 HTML을 slice로 자르며 태그가 깨지는 문제가 발생해, 미리보기는 HTML→텍스트 변환 뒤 요약으로 개선. 본문은 리치텍스트 유지, 미리보기는 안전한 텍스트로 분리해 UX와 안정성을 동시에 확보.
<details>
<summary>코드 보기</summary>
  
전 1
```jsx
  <p className="mb-3 text-xs text-gray-600">{description.slice(0, 80)}</p>
```
전 2
```jsx
  <p
    className="mb-3 text-xs text-gray-600"
    dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
    />
```
후
```jsx
    const htmlToText = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html || "";
    return div.textContent || div.innerText || "";
  }

  const preview = htmlToText(description);
  const short = preview.length >80 ? preview.slice(0, 80) +"..." : preview;

.
.
.

  <p className="mb-3 text-xs text-gray-600">{short}</p>
```
  
</div>
</details>

🔍 로그아웃 시 Axios 인증 헤더를 null로 설정했으나, 헤더 키가 남아 보안 취약점 발생 가능 확인(서버에 "Authorization: null" 보낼 수 있음) → delete 키워드로 헤더 키 자체를 완전히 제거하도록 수정 → 인증 토큰 완전 삭제로 보안 강화 및 불필요한 API 호출 차단 → 로그아웃 처리 모범 사례 적용

<details>
<summary>코드 보기</summary>
  
전
```jsx
    axios.defaults.headers.common["Authorization"] = null;
```
후
```jsx
    delete axios.defaults.headers.common["Authorization"];
```
  
</div>
</details>



  
🔍 관리자 레이아웃 사라짐 → 사이드바 링크와 라우트 경로 일치(camelCase)로 복구, <Outlet> 중첩 유지.
<details>
<summary>코드 보기</summary>
  
전
```jsx
    <Route path="add-blog" element={<AddBlog />} />
```
후
```jsx
    <Route path="addBlog" element={<AddBlog />} />
```
  
</div>
</details>

🔍 ESM import 해석 오류 → 로컬 import에 .js 확장자 명시.
<details>
<summary>코드 보기</summary>
  
전
```js
    import { adminLogin } from "../controllers/adminController";
```
후
```js
    import { adminLogin } from "../controllers/adminController.js";
```
  
</div>
</details>

🔍 상세 API 무응답(포스트맨 무한 로딩) → 성공 분기 res.json({ success: true, blog }) 누락 보완.
<details>
<summary>코드 보기</summary>
  
전
```js
    // if (!blog) { return res.json({ success: false, message: "blog not found" }); }
    // (성공 분기 응답 누락)
```
후
```js
    if (!blog) return res.json({ success: false, message: "blog not found" });
    return res.json({ success: true, blog });
```
  
</div>
</details>

🔍 댓글 작성 실패 → Comment 모델 import 누락 및 요청 필드(blog) 미스매치 수정.

<details>
<summary>코드 보기</summary>
  
전(백엔드)
```js
    // import Comment ... (누락)
    await Comment.create({ blog, name, content }); // ReferenceError 발생
```
후(백엔드)
```js
    import Comment from "../models/Comment.js";
    await Comment.create({ blog, name, content, isApproved: false });
```
전(프론트)
```js
    await axios.post("/api/blog/add-comment", { blogId: id, name, content });
```
후(프론트)
```js
    await axios.post("/api/blog/add-comment", { blog: id, name, content });
```
</div>
</details>

🔍 어드민 인증 이슈 → clearToken()로 헤더/스토리지 정리.

<details>
<summary>코드 보기</summary>
  
```js
    const clearToken = () => {
      setToken(null);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    };
```  
</div>
</details>


🔍 리뷰 대기 댓글 미노출 → 생성 시 isApproved: false 명시, 프론트에서 필터를 isApproved !== true로 방어적 조건 변경.
<details>
<summary>코드 보기</summary>
  
전(백엔드)
```js
    await Comment.create({ blog, name, content }); // isApproved 생략
```
후(백엔드)
```js
    await Comment.create({ blog, name, content, isApproved: false });
```
전(백엔드)
```js
    await Comment.create({ blog, name, content }); // isApproved 생략
```
전(프론트 필터)
```js
    return comment.isApproved === false;
```
후(프론트 필터)
```js
    return comment.isApproved !== true;
```

  
</div>
</details>

</br>

🔍 Postman 이미지 업로드 실패 -> 워킹 디렉토리와 폴더 이름 정정 후 해결
</br>
🔍 GitHub 잔디 미반영 -> 커밋 이메일 교정 후 히스토리 재작성

## 5. 성능 최적화

- 이미지 최적화: ImageKit 변환(webp/auto quality/width=1280)로 전송량 절감 및 초기 로딩 개선.
- 데이터 최소화: 공개 목록은 isPublished: true만 조회, 대시보드는 최근 5건 제한.
- 정적 리소스: CDN 기반 이미지 URL 사용으로 캐시 이점 확보.
</br>

### 6. 회고 / 느낀점

추후 추가

### 7. 컴포넌트 도식화

```
App
 ├─ Routes
 │   ├─ "/" → Home
 │   │    ├─ Navbar
 │   │    ├─ Header (검색)
 │   │    └─ BlogList
 │   │         └─ BlogCard (목록)
 │   ├─ "/blog/:id" → Blog
 │   │    ├─ Navbar
 │   │    ├─ Post Detail (리치텍스트, 이미지)
 │   │    └─ Comments (목록/작성)
 │   └─ "/admin" (가드: 토큰 필요)
 │        ├─ Layout
 │        │    ├─ Topbar (Logout)
 │        │    ├─ Sidebar
 │        │    └─ Outlet
 │        ├─ Dashboard (지표/최근글)
 │        ├─ listBlog (모든 글, 토글/삭제)
 │        ├─ addBlog (Quill, 업로드/발행)
 │        └─ comments (승인/삭제)
 └─ AppContext (axios baseURL/Authorization, token, blogs, input)
```
