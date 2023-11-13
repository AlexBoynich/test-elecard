import { useMemo } from "react"


export const useSortedPosts = (posts, sort, radio) => {
    const sortedPosts = useMemo(() => {
        if(sort && radio === 'increase') { 
          return [...posts].sort((a, b) => a[sort] > b[sort])
        } else if (sort && radio === 'decrease'){
            return [...posts].sort((a, b) => a[sort] < b[sort])
        }
        return posts;
      }, [sort, posts, radio])
    return sortedPosts;
}


export const usePosts = (posts, sort, radio,  page) => {
    const sortedPosts = useSortedPosts(posts, sort, radio)
    const sortedAndPagedPosts = useMemo(()=> {
        return sortedPosts.slice(12*(page-1), 12 * page).filter(el=> localStorage.getItem('names')==null ? el : !JSON.parse(localStorage.getItem('names')).includes(el.timestamp))
    },[sortedPosts, page])
    return sortedAndPagedPosts
}

