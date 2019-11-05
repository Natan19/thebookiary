function fetchSavedBooks() {
    return fetch(process.env.REACT_APP_API_URL+'/api/listBooks', {
        method: 'GET',
        headers:{
            authorization: localStorage.getItem('x-auth-token')
        }
    })
}
export default fetchSavedBooks;