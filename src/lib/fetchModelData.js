// const url = "https://btl-ltw-be.onrender.com";
const url = "http://localhost:8081";

// API cho login, lưu token vào localStorage
// localStorage.setItem("token", result.token);
const fetchLogin = async (data) => {
  /*
    data = {
      username: "string",
      password: "string",
    }
  */
  const response = await fetch(url + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}
    
// API cho register
const fetchRegister = async (data) => {
  /**
    data = {
      username: "string",
      password: "string",
      first_name: "string",
      last_name: "string",
      location: "string",
      description: "string",
      occupation: "string",
      avatar: "file", // e.target.files[0]
    }
   */
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.password);
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("location", data.location);
  formData.append("description", data.description);
  formData.append("occupation", data.occupation);
  formData.append("avatar", data.avatar);
  
  const response = await fetch(url + "/api/auth/register", {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  return result;
}

//API reset password
const fetchResetPassword = async (data) => {
  /**
    data = {
      oldPassword: "string",
      newpassword: "string",
    }
   */
  const response = await fetch(url + "/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

// API cho lấy thông tin 1 user theo id
const fetchUser = async (userId) => {
  const response = await fetch(url + "/api/user/" + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  const result = await response.json();
  return result;
};

// API cho lấy danh sách user
const fetchUserList = async () => {
  const response = await fetch(url + "/api/user/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  const result = await response.json();
  return result;
};

const fetchUserListBySearch = async (search) => {
  const response = await fetch(url + "/api/user/list/search/" + search, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  const result = await response.json();
  return result;
}

// API lấy ra thông tin user hiện tại
const fetchUserProfile = async () => {
  const response = await fetch(url + "/api/user/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  const result = await response.json();
  return result;
}

// API cho update thông tin user
const fetchUserUpdate = async (data) => {
  /**
    data = {
      first_name: "string",
      last_name: "string",
      location: "string",
      description: "string",
      occupation: "string",
      avatar: "file", // e.target.files[0]
    }
   */
  const formData = new FormData();
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("location", data.location);
  formData.append("description", data.description);
  formData.append("occupation", data.occupation);
  formData.append("avatar", data.avatar);
  const response = await fetch(url + "/api/user/", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
    body: formData,
  });
  const result = await response.json();
  return result;
}

// API cho lấy danh sách post của user hiện tại
const fetchPostListOwn = async () => {
  const response = await fetch(url + "/api/post/list/own", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  const result = await response.json();
  return result;
}

// API cho lấy danh sách post của 1 user
const fetchPostListByUser = async (userId) => {
  const response = await fetch(url + "/api/post/list/" + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  const result = await response.json();
  return result;
}


// API cho thêm post
const fetchPostAdd = async (data) => {
  /**
    data = {
      caption: "string",
      image: "file", // e.target.files[0]
    }
   */
  const formData = new FormData();
  formData.append("caption", data.caption);
  formData.append("image", data.image);
  const response = await fetch(url + "/api/post/new", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
    body: formData,
  });
  const result = await response.json();
  return result;
}


// API cho update post
const fetchPostUpdate = async (postId, data) => {
  /**
    data = {
      caption: "string",
      image: "file", // e.target.files[0]
    }
   */
  console.log(data);
  const formData = new FormData();
  formData.append("caption", data.caption);
  formData.append("image", data.image);
  const response = await fetch(url + "/api/post/update/" + postId, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
    body: formData,
  });
  const result = await response.json();
  return result;
}


// API cho xóa post
const fetchPostDelete = async (postId) => {
  const response = await fetch(url + "/api/post/" + postId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  const result = await response.json();
  return result;
}

// API cho lấy danh sách comment của 1 post
const fetchCommentList = async (postId) => {
  const response = await fetch(url + "/api/comment/list/" + postId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  const result = await response.json();
  return result;
}

// API cho lấy số lượng comment của 1 post
const fetchCommentCount = async (postId) => {
  const response = await fetch(url + "/api/comment/count/" + postId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  const result = await response.json();
  return result;
}


// API cho thêm comment
const fetchCommentAdd = async (postId, data) => {
  /**
    data = {
      content: "string",
      parent_id: "string",
      level: "number",
    }
   */
  const response = await fetch(url + "/api/comment/" + postId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}


// API cho lấy số lượng favorite của 1 post
const fetchFavoriteCount = async (postId) => {
  const response = await fetch(url + "/api/favorite/count/" + postId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  const result = await response.json();
  return result;
}

// API cho người dùng thích bài viết
const fetchFavoriteReact = async (postId) => {
  const response = await fetch(url + "/api/favorite/" + postId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  const result = await response.json();
  return result;
}


// API cho kiểm tra người dùng đã thích bài viết chưa
const fetchFavoriteCheck = async (postId) => {
  const response = await fetch(url + "/api/favorite/check/" + postId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  const result = await response.json();
  return result;
}



const models = {
  fetchLogin,
  fetchRegister,
  fetchResetPassword,
  fetchUser,
  fetchUserList,
  fetchUserListBySearch,
  fetchUserProfile,
  fetchUserUpdate,
  fetchPostListOwn,
  fetchPostListByUser,
  fetchPostAdd,
  fetchPostUpdate,
  fetchPostDelete,
  fetchCommentList,
  fetchCommentCount,
  fetchCommentAdd,
  fetchFavoriteCount,
  fetchFavoriteReact,
  fetchFavoriteCheck,
};

export default models;
