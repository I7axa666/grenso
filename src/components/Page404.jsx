import { Link } from "react-router-dom";
import '../css/Page404.scss'

const Page404 = ()  =>  {

    return (
        <section className="error">
          <div className="message">
            <h1>404</h1>
            <p> Простите, страница не найдена!</p>
            <div className="sub">
              <p><Link to="/">Вернуться на главную</Link></p>
            </div>
		      </div>
        </section>
    )
}

export default Page404
