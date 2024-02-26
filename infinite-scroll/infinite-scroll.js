const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
let currentPage = 1;

const postsContainer = document.getElementById('posts-container');

fetchData();

postsContainer.addEventListener('scroll', handleScroll)

function handleScroll() {
    const bottomSpaceLeftToScroll = (this.scrollHeight - this.scrollTop - this.clientHeight)

    if(bottomSpaceLeftToScroll > 1) return;
    fetchData(currentPage++);
}

async function fetchData(page) {
    const url = createURL(page);
    const response = await fetch(url);
    const data = await response.json();

    const fragment = document.createDocumentFragment();
    data.forEach(post => {
        fragment.appendChild(createPostElement(post.title, post.body))
    })
    postsContainer.appendChild(fragment)

    if(data.length === 0) {
        postsContainer.removeEventListener('scroll', handleScroll)
    }
}

function createPostElement(title, body) {
    const sectionElement = document.createElement('section'); 
    const postTitleElement = document.createElement('h4');
    const postBodyElement = document.createElement('p');

    postTitleElement.classList.add('postTitle');
    postTitleElement.textContent = title;

    postBodyElement.classList.add('postBody');
    postBodyElement.textContent = body;

    sectionElement.appendChild(postTitleElement);
    sectionElement.appendChild(postBodyElement);

    return sectionElement;
}

function createURL(page) {
    const url = new URL(API_BASE_URL);
    url.searchParams.set('_page', page);

    return url
}