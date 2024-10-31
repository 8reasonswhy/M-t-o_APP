import styles from './Weather.module.scss'
import {Card} from "react-bootstrap";
import PositionSvg from "../Svgs/PositionSvg";
import DefaultWeather from "../Svgs/DefaultWeather";
import Thermometer from "../Svgs/Thermometer";
import Time from "../Svgs/Time";
import Wind from "../Svgs/Wind";
import {useSelector} from "react-redux";
import Moment from "react-moment";
import SpeedoMeter from "../Svgs/SpeedoMeter";
import Humidity from "../Svgs/Humidity";
import Sunny from "../Svgs/Sunny";
import Cloudy from "../Svgs/Cloudy";
import Thunder from "../Svgs/Thunder";
import Rainy from "../Svgs/Rainy";

export const Weather = () => {
    const weatherData = useSelector(({weather}) => weather)
    const displayIcon = () => {
        const defaultWidth = '200px';
        const defaultHeight = '200px';
        const number = weatherData.weather.icon.substring(0, 2)
        switch (number) {
            case '01':
                return <Sunny width={defaultWidth} height={defaultHeight}/>
            case '03':
            case '04':
                return <Cloudy width={defaultWidth} height={defaultHeight}/>
            case '10':
                return <Rainy width={defaultWidth} height={defaultHeight}/>
            case '11':
                return <Thunder width={defaultWidth} height={defaultHeight}/>
            default:
                return <img src={`https://openweathermap.org/img/wn/${weatherData.weather.icon}@2x.png`} alt=""/>
        }
    }
    return (
        <>
            <Card className={styles.container}>
                {weatherData.isLoaded ?
                    <Card.Body>
                        <Card.Title>
                            {weatherData.name} , {weatherData.sys.country} <PositionSvg color={'rgba(255,255,255,0.7)'}/>
                            <div className={styles.date}>
                                <div>
                                    <Moment format={'llll'}/></div>
                                <div><Time width={'15px'} height={'15px'}/></div>
                            </div>
                        </Card.Title>
                        <Card.Text as={'div'} className={styles.weather_infos}>
                            <div>
                                {displayIcon()}
                            </div>
                            <div className={styles.temperature}>
                                <div>{weatherData.main.feels_like}°C</div>
                                <div>
                                    <Thermometer/>
                                </div>
                            </div>
                            <div>
                                Good Morning {weatherData.name}
                                <div className={styles.separator}></div>
                            </div>
                            <div className={styles.infos}>
                                <div className={styles.border_right}>
                                    <div>
                                        <DefaultWeather color={'#fff'}/></div>
                                    <div>Sunrise</div>
                                    <div>
                                        <Moment unix={true} format={'hh:mm'}>
                                            {weatherData.sys.sunrise}
                                        </Moment>
                                    </div>
                                </div>
                                <div className={styles.border_right}>
                                    <div><Wind/></div>
                                    <div>Wind</div>
                                    <div>{weatherData.wind.speed} m/s</div>
                                </div>
                                <div className={styles.border_right}>
                                    <div><SpeedoMeter color={'#fff'}/></div>
                                    <div>Pressure</div>
                                    <div>{weatherData.main.pressure} Pa</div>
                                </div>
                                <div className={styles.border_right}>
                                    <div><Humidity color={'#fff'}/></div>
                                    <div>humidity</div>
                                    <div>{weatherData.main.humidity}%</div>
                                </div>
                                <div>
                                    <div><Thermometer color={'#fff'} width={'25px'} height={'25px'}/></div>
                                    <div>Temp</div>
                                    <div>{weatherData.main.temp_max} C</div>
                                </div>
                            </div>

                        </Card.Text>
                    </Card.Body> :
                    <Card.Body>
                        <Card.Title>Please choose your city.</Card.Title>
                    </Card.Body>
                }
            </Card>
        </>
    )
}