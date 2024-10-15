import react, {useState, useEffect} from "react";
import Card from "./Card"
let API_key = "&api_key=34bff23dc0e6e198d082c23f332be9b2";
let base_url = "https://api.themoviedb.org/3";
let url = base_url+"/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"+API_key;
let arr = ["Popular","Theatre","TopRated"];

const Main = ()=> {

    const [movieData, setMovieData]= useState([]); //original value of movieData is empty, setMovieData is used to update movieData
    const [url_set, setUrl] = useState(url); //original value or url_Set is the url variable, setUrl is used to update url_Set
    const [search, setSearch] = useState();
    //whenver page loads or url changes, useEffect runs
    useEffect(() => {
        fetch(url_set).then(res=>res.json()).then(data=>{
            // console.log(data)
            setMovieData(data.results); //updates movieData value to data.results
        });

    } , [url_set])
    //useEffect is run after the initial component is rendered or if the url changes (that is the purpose of the [url_set] above)

    const getData=(movieType)=>{
        if(movieType=="Popular"){
            url = base_url+"/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"+API_key;
        }
        if(movieType=="Theatre") {
            url = base_url + "/movie/now_playing?language=en-US&page=1"+API_key;
        }
        if (movieType=="TopRated") {
            url = base_url + "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200"+API_key;
        }
        setUrl(url)
    }
    {/* understand this */}
    const searchMovie=(evt)=>{
        if(evt.key=="Enter") {
            url = base_url + "/search/movie?query="+search+"&api_key=34bff23dc0e6e198d082c23f332be9b2"
            setUrl(url)
            setSearch(" ") //sets value of search to nothing to empty out input box of search
        }
    }
    
    return (
        <>
            <div className = "header">
                <nav>
                    <ul>
                        {
                            //goes through each element in the array, which passes it's value and index position
                            //for each element in the array, return a li element where the key is index and the name is the value of the element, and whenever the user clicks on the element, we call getData based on the element name since the api url changes for each element
                            arr.map((value,pos)=>{ //understand this
                                return(
                                <li><a href="#" key={pos} name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <form>
                {/* understand this */}
                    <div className = "search-btn"> 
                        <input type ="text" placeholder = "Enter Movie Name" 
                        //whenever the input box changes, we set the value of search using setSearch to the input box value and we set the value of the input box to the search value
                        className = "inputText" onChange={(e)=>{setSearch(e.target.value)}} //setSearch sets value of search to e.target.value
                        value={search} onKeyPress = {searchMovie}  > 
                        {/* call searchMovie when you press enter */}
                        </input>
                        <button><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </form>
                
            </div>
            <div className = "container">
                { //understand this //for each movie in movieData, we create a Card component using the movieData info
                    (movieData.length ==0)?<p className= "notfound">Not Found</p>: movieData.map((res,pos)=>{
                    return (
                        //property called info to Card and can use this in the card component in card.js
                        <Card info = {res} key = {pos}></Card>
                    )
                })
            }
            {/* If movieData length is 0, write "Not Found", or else, create a Card item for each item in movieData Array */}
            </div>
        </>
    )
}
export default Main;