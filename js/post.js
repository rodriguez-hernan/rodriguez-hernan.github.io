// Local Storage and DOM

function fetchInLocalStorage(item){
  const ls = localStorage.getItem(item);
  return JSON.parse(ls);
}

function saveInLocalStorage(obj, lsItem) {
  const objString = JSON.stringify(obj);
  localStorage.setItem(lsItem, objString);
}

function addPost() {
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;
  const postList = fetchInLocalStorage('postList');
  const newPost = { title, content };
  postList.push(newPost);
  saveInLocalStorage(postList, 'postList');
  refresh();
  renderPostList();
}

function refresh() {
  document.getElementById("post-list").innerHTML = "";
}

function verifyLS() {
  const postList = localStorage.getItem('postList');
  if (postList === null){
    localStorage.setItem('postList', '[]');
  }
}

function renderPostList() {
  verifyLS();
  const postList = fetchInLocalStorage('postList');
  postList.forEach( (post, index) => {
    let node = document.createElement("div");
    node.setAttribute("class", "post");
    node.setAttribute("id", `${index}`);

    let titleNode = generateElement("H4", "post__title", post.title);
    let contentNode = generateElement("P", "post__content", post.content);
    let buttonNode = generateElement("BUTTON", "post__button", "Delete Post");
    buttonNode.setAttribute("onclick", `removePost(${index})`);
    
    node.appendChild(titleNode);
    node.appendChild(contentNode);
    node.appendChild(buttonNode);
    document.getElementById("post-list").appendChild(node);
  })
}

function generateElement(element, className = "", text = ""){
  let node = document.createElement(element);
  node.setAttribute("class", className);
  let textNode = document.createTextNode(text);
  node.appendChild(textNode);
  return node;
}

function removePost(num) {
  const postList = fetchInLocalStorage('postList');
  postList.splice(num, 1);
  saveInLocalStorage(postList, 'postList');
  refresh();
  renderPostList();
}