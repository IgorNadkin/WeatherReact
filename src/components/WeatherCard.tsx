import React, { useState } from 'react';
import { useGetWeatherByCityQuery } from '../weatherApi/weatherApi';
import { Card, Input, Button, Typography, Spin, Divider, Col, List, Row, Space,Image, Modal } from 'antd';
import {SettingsDrawer} from './settings';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { ManageLocations } from './ManageLocation';

const { Title, Text } = Typography;

export const WeatherCard: React.FC = () => {
  const { isCelsius, isKmPerHour, isMbar } = useSelector((state: RootState) => state.measurement);
  const selectedCity = useSelector((state: RootState) => state.cities.selectedCity);
  const { data, error, isLoading } = useGetWeatherByCityQuery(selectedCity || 'Саранск');

  const convertTemperature = (temp: number) => (isCelsius ? temp : temp * 9 / 5 + 32);
  const convertWindSpeed = (speed: number) => (isKmPerHour ? speed * 3.6 : speed);
  const convertPlessure = (plessure: number) => (isMbar ? plessure * 0.7501 : plessure);

  const getNext4HoursForecast = () => {
    if (!data || !data.forecast || !data.forecast.forecastday) return [];
    const now = new Date(data.location.localtime);
    const currentHour = now.getHours();

    // Фильтрация прогноза на 4 часа вперед
    return data.forecast.forecastday[0].hour.filter(
      (hourData) => {
        const forecastHour = new Date(hourData.time).getHours();
        return forecastHour >= currentHour && forecastHour < currentHour + 4;
      }
    );
  };

  const formatTime = (time: string) => {
    return time.split(' ')[1]; // Извлекаем только HH:MM
  };

  const forecastNext4Hours = getNext4HoursForecast();
  return (
    <div style={{ padding: "20px", background: "#317FC6", minHeight: "100vh" }}>
      <ManageLocations />
      <SettingsDrawer/>
    {isLoading ? (
        <Spin  />
      ) : error ? (
        <Text type="danger">Ошибка получения погоды</Text>
      ) : (
        data && (
          <div>
           <Card style={{ borderRadius: "10px", marginBottom: "20px" }}>
            <Title level={3} style={{ textAlign: "center", marginBottom: 0 }}>
               {data?.location.name}
             </Title>
            <Text type="secondary" style={{ display: "block", textAlign: "center" }}>
               {data?.location.localtime}
             </Text>
             <Divider />
             <Row justify="center">
               <Col>
                 <div style={{ fontSize: "30px", lineHeight: 1, marginBottom: "20px" }}>Температура: {convertTemperature(data?.current.temp_c).toFixed(1)}°{isCelsius ? 'C' : 'F'}</div>
                 <Image src={data?.current.condition.icon}></Image>
                 <Text type="secondary">Погода: {data?.current.condition.text}</Text>
               </Col>
             </Row>
             <Row justify="space-between" style={{ marginTop: "20px" }}>
               <Col>
                 <Space direction="vertical">
                  
                   <Text>Скорость ветра: {convertWindSpeed(data?.current.wind_mph).toFixed(1)} {isKmPerHour ? 'км/ч' : 'м/с'}</Text>
                 </Space>
               </Col>
               <Col>
                 <Space direction="vertical">
                  
                   <Text>Давление: {convertPlessure(data?.current.pressure_mb).toFixed(1)} {isMbar ? 'мм.рт.ст' : 'гПа'}</Text>
                 </Space>
               </Col>
               <Col>
                 <Space direction="vertical">
                  
                   <Text>Влажность: {data?.current.humidity}%</Text>
                 </Space>
               </Col>
             </Row>
           </Card>

           <Card style={{ borderRadius: '10px', marginTop: '20px' }}>
                <Title level={4}>Почасовой прогноз</Title>
                <Row gutter={16}>
                  {forecastNext4Hours.map((hourData, index) => (
                    <Col key={index} span={6} style={{ textAlign: 'center' }}>
                      <Text>{formatTime(hourData.time)}</Text>
                      <div style={{ fontSize: '18px', margin: '5px 0' }}>{convertTemperature(hourData.temp_c).toFixed(1)}°{isCelsius ? 'C' : 'F'}</div>
                      <Image src={hourData.condition.icon}></Image>
                      <Text type="secondary">{hourData.condition.text}</Text>
                    </Col>
                  ))}
                </Row>
              </Card>
    
              <Card style={{ borderRadius: "10px", marginTop: "20px" }}>
  <Title level={4}>Прогноз погоды на 7 дней</Title>
  {data?.forecast?.forecastday && (
    <List
      dataSource={data.forecast.forecastday}
      renderItem={(item) => (
        <List.Item>
          <Row style={{ width: "100%" }}>
            {/* Отображение дня недели */}
            <Col span={6}>
              <Text>{new Date(item.date).toLocaleDateString("ru", { weekday: "short" })}</Text>
            </Col>

            {/* Средняя температура */}
            <Col span={12}>
              <Text>
                Темп: {convertTemperature(item.day.avgtemp_c).toFixed(1)}°{isCelsius ? 'C' : 'F'}
              </Text>
            </Col>

            {/* Вероятность осадков */}
            <Col span={6}>
              <Image src={item.day.condition.icon}></Image>
              <Text>{item.day.daily_chance_of_rain}% осадков</Text>
            </Col>
          </Row>
        </List.Item>
      )}
    />
  )}
</Card>

           </div>))}
         </div>
  );
};

export default WeatherCard;
