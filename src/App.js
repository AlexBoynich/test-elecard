import { useEffect, useState } from 'react';
import './App.css';
import MainLook from './components/Main/MainLook';
import Footer from './components/base/Footer/Footer';
import Header from './components/base/Header/Header';
import { useFetching } from './hooks/useFetching';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';
import MyButton from './components/UI/Button/MyButton';
import { usePosts } from './hooks/usePosts';
import MySelect from './components/UI/Select/MySelect';
import TreeLook from './components/Tree/TreeLook';

function App() {

  const [posts, setPosts] = useState([])

  const [totalPosts, setTotalPosts] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)

  const [filter, setFilter] = useState({sort: 'name'})

  const [radio, setRadio] = useState('increase')

  const [look, setLook] = useState('main')

  const currentPagePosts = usePosts(posts, filter.sort, radio,  currentPage)

  
  useEffect(() => {
    console.log('Elecard CW Challenge')
    fetchPosts()
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [look])

  const [fetchPosts, isLoading] = useFetching(async () => {
    const response = await PostService.getAll()
    setPosts(response.data.map((el, index) => {
      return {name: `Name${index}`, timestamp: el.timestamp, image: el.image, filesize: el.filesize, category: el.category}
    }))
    setTotalPosts(response.data.length)
  })


  const removeCard = (id) => {
    setPosts(posts.filter((el)=> el.timestamp!=id))
    if(localStorage.getItem('names') ==null) {
      localStorage.setItem('names', JSON.stringify([id]))        
    } else localStorage.setItem("names", JSON.stringify([JSON.parse(localStorage.getItem('names')).flat(), (id)].flat()));
  }

  const clearAll = () => {
    localStorage.clear()
    fetchPosts()
  }

  const changePage = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className='app'>
      <Header look={look} setLook={setLook}/>
      {(look==='tree') ? <TreeLook posts={posts}/> : 
        <div>              
          <MyButton style={{marginTop: '120px', position: 'absolute'}} onClick={clearAll}>Сбросить все</MyButton>
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '120px',marginRight: '40px', position: 'absolute', right: '0'}}>
            <MySelect
              defaultValue={'Сортировка'}
              options={[
                  {value: 'timestamp', name: 'По времени'},
                  {value: 'category', name: 'По категории'},
                  {value: 'filesize', name: 'По размеру'},
                  {value: 'name', name: 'По названию'},
              ]}
              value={filter.sort}
              onChange={selectedSort => setFilter({sort: selectedSort})}
            />
            <label>
              <input 
                type='radio'
                name='myradio' 
                value='increase'
                onChange={e=> {setRadio(e.target.value)}}
                defaultChecked='true'
              />
              По увеличению
            </label>
            <label>
              <input 
                type='radio'
                name='myradio' 
                value='decrease'
                onChange={e=> {setRadio(e.target.value)}}
              />
              По уменьшению
            </label>
          </div>

          { (!isLoading)
            ?   <Loader />
            : <MainLook 
              posts={currentPagePosts} 
              remove={removeCard}
            />
          }
          <div className='pagesBar'>
          {((currentPage>10) && (currentPage <=55)) ? <MyButton className={'pageButton'} style={{marginBottom: '120px'}} onClick={() => {changePage(1)}} >1</MyButton> : ''}
            {(currentPage !=1) ? <MyButton className={'pageButton'} style={{marginBottom: '120px'}} onClick={() => {changePage(currentPage-1)}} >{currentPage-1}</MyButton> : ''}
            <MyButton className='pageButton' style={{marginBottom: '120px', background: 'aliceblue'}} onClick={() => {changePage(currentPage)}}>{currentPage}</MyButton>
            {(currentPage <55) ? <MyButton className='pageButton' style={{marginBottom: '120px'}} onClick={() => {changePage(currentPage+1)}}>{currentPage + 1}</MyButton> : ''}
            {(currentPage <54) ? <MyButton className='pageButton' style={{marginBottom: '120px'}} onClick={() => {changePage(totalPosts/12)}}>{totalPosts/12}</MyButton> : ''}
          </div>
        </div>
      }

      <Footer />
    </div>
  );
}

export default App;
