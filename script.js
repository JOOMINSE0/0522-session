// (1) querySelector를 이용하여 해당 요소를 선택하여 title 변수에 할당하세요.
const title = document.querySelector('.section-title h1');

// (1) querySelector를 이용하여 해당 요소를 선택하여 container 변수에 할당하세요.
const container = document.querySelector('.container');

// (1) querySelector를 이용하여 해당 요소를 선택하여 container 변수에 할당하세요.
const btnContainer = document.querySelector(".btn-container")

// (2) 
const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

const fetchFollowers = async () => {
	
	const response = await fetch(url).then(res => res.json()) 
	//json으로 반환을 해주어야 함
	//awit키워드가 없었기 때문에 data값을 가져오기 전에 반환을 해주어서 100개가 나타나지 않았음

	console.log(response);
	//데이터 가져오기
	return response;
};

	let index = 0;
	const init = async () => {
		//비동기 함수안에서 await작동
		// fetchFollowers 함수의 반환값을 followers에 저장하기
		const followers = await fetchFollowers();
		// Loading -> Pagination 텍스트 수정
		title.textContent = "Pagination";
		
		pages = paginate(followers);
		setupUI();
		//console.log(pages);
	};
	
	init();

	const displayFollowers = (followers) => {
		let newFollowers = followers
		// map 함수를 활용하여 각 팔로워들의 정보를 보여주는 코드를 작성하세요.
		// avatar_url은 프로필 사진 url, login은 팔로워의 이름, html_url은 팔로워의 github 주소입니다.
		.map((person) => {
			//구조분해 할당-> 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 JavaScript 표현식
			const { avatar_url, login, html_url } = person;
			return`<article class="card">
			<img src="${avatar_url}", alt='person'/>
			<h4>${login}</h4>
			<a href="${html_url}" class="btn">view profile</a>
			</article>`;
				// 잘 모르겠다면 5/11 정기세션 실습 문제 2번 코드를 참고해보세요
		});
	
		newFollowers = newFollowers.join('');
		container.innerHTML = newFollowers;
	};
		  
// (2)
const setupUI = () => {
	displayFollowers( pages[index]); 
	displayButtons(btnContainer, pages, index);
  };
  
const displayButtons = (container, pages, activeIndex) => {
  let btns = pages.map((_, pageIndex) => {

	// activeIndex와 pageIndex 번호가 같으면 active-btn 클래스
	// 같지 않으면 ’’(빈 문자열)을 적용할 수 있도록 삼항연산자를 이용하여 작성하기
		return `<button class="page-btn" ${activeIndex===pageIndex?"active-btn":""}"response-index="${pageIndex}">
		    ${pageIndex + 1}</button>`;
  });
  btns.push(`<button class="next-btn">next</button>`);
  btns.unshift(`<button class="prev-btn">prev</button>`);

//btns합치고 페이지에 글자 생성
  container.innerHTML = btns.join(""); 
};

// 버튼에 이벤트 달기
btnContainer.addEventListener("click", function (e) {
	if (e.target.classList.contains("btn-container")) return;
  
	if (e.target.classList.contains("page-btn")) {
	  index = parseInt(e.target.data-set.index);
	}
	  
	if(e.target.classList.contains("next-btn")){
		index+=1;
		if(index>9)
		{
		  index=9
		}
	  }
	if(e.target.classList.contains("prev-btn")){
		index-=1;
		if(index<0)
		{
		  index=0;
		}
	}
	setupUI();
	  // Next 버튼을 누르면 index가 증가하고, Prev 버튼을 누르면 index가 감소하도록 조건문을 작성하세요.
	  // 주의) 인덱스의 범위는 0 이상 10 이하입니다.
  
  });

  let pages = [];  // 팔로워 정보를 10개씩 나눠서 저장할 배열

// paginate() 함수는 팔로워 전체를 입력으로 받아 10명씩 나눠서 저장하는 함수입니다.
const paginate = (followers) => {
  const itemsPerPage = 10;
  //Math.ceil는 정수의 올림값을 반환
  const numberOfPages = Math.ceil(followers.length / itemsPerPage);

  const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
		
	// slice 함수에 올바른 파라미터를 넣어주세요.
    return followers.slice(start, start+itemsPerPage);
  });

  return newFollowers;
};




  


  
  

