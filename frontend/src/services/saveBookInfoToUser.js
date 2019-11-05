function saveBookInfoToUser(bookInfo) {
    if(Object.keys(bookInfo).length != 0) {
        return fetch(process.env.REACT_APP_API_URL+'/api/books', {
            method: 'POST',
            headers:{
                authorization: localStorage.getItem('x-auth-token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookInfo.volumeInfo)
        });
    }
}
export default saveBookInfoToUser;