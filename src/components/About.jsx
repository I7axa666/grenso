import '../css/About.css'

const About = ()  =>  {

    return (
      <div className="page-content">
          <section className="about-info">
              <h2 className="text-center">О нас</h2>
              <p>
                АО "ГРЭНСО" - Агрегатор управления изменением режима потребления электрической энергии 
                на оптовом рынке электроэнегии (мощности).
              </p>
              <p className="h4 text-center">Мы предлагаем полный пакет услуг:</p>
              <ol>
                <li>Индивидуальный подход. 
                </li>
                <li>Подготовка комплекта документов с целью предоставления услуг по измеению режима потребления
                </li>
                <li>Оформление договора.
                </li>
                <li>Сопровождение в выполнении разгрузок.</li>
                <li>Консултации по выбору технологических решений.</li>
              </ol>
              <p> Мы предлагаем оптимизацию режима потребления электрической энергии с минимальными затратами. 
              </p>
              <p>А также получение дополнительного дохода от процесса изменения режима потребления.
                Призвести рассчитать примерный фингансовый результат Вы можете в нашем экуспресс-калькуляторе.
              </p>
            </section>
      </div>
    )
}

export default About
