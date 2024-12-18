import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { addCity, removeCity, setSelectedCity } from '../Store/Slices/CitiesSlice';
import { Input, List, Card, Typography, Row, Col, Image, Button, Modal, Divider, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface City {
  name: string;
  temp: string;
  weather: string;
  icon: string;
}

export const ManageLocations: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открытие и закрытие Drawer
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    // Открытие и закрытие Drawer
  const dispatch = useDispatch();
  const cities = useSelector((state: RootState) => state.cities.cities);
  const selectedCity = useSelector((state: RootState) => state.cities.selectedCity);

  const [search, setSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddCity = () => {
    if (search.trim()) {
      dispatch(
        addCity({
          name: search,
        })
      );
      setSearch('');
    }
  };

  const handleRemoveCity = (name: string) => {
    dispatch(removeCity(name));
  };

  const handleCitySelect = (cityName: string) => {
    dispatch(setSelectedCity(cityName));
  };

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
        {/* Кнопка троеточия */}
       <div style={{ position: "absolute", top: 20, left: 20, cursor: "pointer" }}>
         <PlusOutlined style={{ fontSize: "24px" }} onClick={toggleDrawer} />
       </div>
       <Drawer
         title="Город"
         placement="left"
         onClose={toggleDrawer}
         open={isDrawerOpen}
         bodyStyle={{ background: "#317FC6", color: "#fff" }}
       >
      <Input
        placeholder="Выберите город"
        value={search}
        onChange={handleSearchChange}
        onPressEnter={handleAddCity}
        style={{ marginBottom: '16px' }}
      />
      <List
        dataSource={cities}
        renderItem={(city) => (
          <List.Item
          onClick={() => handleCitySelect(city.name)}
            style={{
              backgroundColor: city.name === selectedCity ? '#e6f7ff' : 'white',
              cursor: 'pointer',
            }}>
            <Card style={{ width: '100%', borderRadius: '10px' }}>
              <Row align="middle" justify="space-between">
                <Col>
                  <Title level={5}>{city?.name}</Title>
                </Col>
                <Col>
                  <Button
                    type="link"
                    danger
                    onClick={() => handleRemoveCity(city.name)}
                  >
                    Удалить
                  </Button>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
      <Button type="primary" style={{ marginTop: '16px' }} onClick={handleAddCity}>
        Добавить город
      </Button>
      </Drawer>
    </div>
  );
};
