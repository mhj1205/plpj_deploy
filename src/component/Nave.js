import { Link,Outlet } from "react-router-dom";
import '../styles.css';
const Nave =({isAuthenticated,logout}) =>{
    console.log(isAuthenticated);
    return(
    <>
       <div className="flex-shrink-0">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container px-5">
                    <Link className="navbar-brand" to='/'>니생각 내생각</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link" to='/'>홈</Link></li>
                            <li className="nav-item"><Link className="nav-link" to='/Gathertown'>Gathertown</Link></li>
                            <li className="nav-item"><Link className="nav-link" to='/GatherWeb'>GatherWeb</Link></li>
                            <li className="nav-item"><Link className="nav-link" to='/Board'>게시판</Link></li>
                            <li className="nav-item"><Link className="nav-link" to='/Aichating'>AI채팅</Link></li>
                            <li className="nav-item" hidden={isAuthenticated ? true : false} ><Link className="nav-link" to='/Login'>로그인</Link></li>
                            <li className="nav-item" hidden={isAuthenticated ? false : true} onClick={()=>logout()} ><Link className="nav-link"to='/'>로그아웃</Link></li>
                            <li className="nav-item"><Link className="nav-link" to='/Faq'>FAQ</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
       </div>
       <Outlet/>
       <footer className="bg-dark py-4 mt-auto">
            <div className="container px-5">
                <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                    <div className="col-auto"><div className="small m-0 text-white">Copyright &copy; Your Website 2023</div></div>
                    <div className="col-auto">
                        <a className="link-light small" href="#!">Privacy</a>
                        <span className="text-white mx-1">&middot;</span>
                        <a className="link-light small" href="#!">Terms</a>
                        <span className="text-white mx-1">&middot;</span>
                        <a className="link-light small" href="#!">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    </>
    )
}

export default Nave;