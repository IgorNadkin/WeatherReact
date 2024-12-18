import React, { useState } from 'react';
import { Drawer, List, Typography, Switch, Divider } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { setIsCelsius, setIsKmPerHour, setIsMbar } from '../Store/Slices/MeasurementSlice';
import { MoreOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const SettingsDrawer: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Открытие и закрытие Drawer
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const dispatch = useDispatch();
  const { isCelsius, isKmPerHour, isMbar } = useSelector((state: RootState) => state.measurement);

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
       {/* Кнопка троеточия */}
       <div style={{ position: "absolute", top: 20, right: 20, cursor: "pointer" }}>
         <MoreOutlined style={{ fontSize: "24px" }} onClick={toggleDrawer} />
       </div>

       {/* Drawer с настройками */}
       <Drawer
         title="Настройки"
         placement="right"
         onClose={toggleDrawer}
         open={isDrawerOpen}
         bodyStyle={{ background: "#317FC6", color: "#fff" }}
       >
         <div>
           {/* Секция с настройками */}
           <Title level={5} style={{ color: "#fff" }}>Единицы измерения</Title>
           <List>
             <List.Item>
               <Text>Единица измерения температуры</Text>
               <Switch checked={isCelsius} checkedChildren="°C" unCheckedChildren="°F" onChange={(checked) => dispatch(setIsCelsius(checked))}/>
             </List.Item>
             <List.Item>
               <Text>Единица измерения скорости ветра</Text>
               <Switch checked={isKmPerHour} checkedChildren="км/ч" unCheckedChildren="м/с" onChange={(checked) => dispatch(setIsKmPerHour(checked))}/>
             </List.Item>
             <List.Item>
               <Text>Единица измерения атм. давления</Text>
               <Switch checked={isMbar} checkedChildren="мм.рт.ст" unCheckedChildren="гПа" onChange={(checked) => dispatch(setIsMbar(checked))}/>
             </List.Item>
           </List>

           {/* Разделитель */}
           <Divider style={{ borderColor: "#fff", margin: "20px 0" }} />
         </div>
       </Drawer>
     </div>


  );
};
