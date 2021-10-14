import React, { useState } from "react";
import { Form, Alert, Switch, Table } from "antd";

const { Item } = Form;

export const SchedulePickerTable = ({ scheduleFor, scheduleData }) => {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  const [hoursSelected, setHoursSelected] = useState(0);

  const handleScheduleChange = (checked) => {
    if (checked) {
      setHoursSelected(hoursSelected + 1);
    } else {
      setHoursSelected(hoursSelected - 1);
    }
  };

  const columns = [
    {
      title: "Hora",
      dataIndex: "hour",
      key: "hour",
      width: 150,
    },
    {
      title: "Lunes",
      dataIndex: "monday",
      key: "monday",
      width: 200,
    },
    {
      title: "Martes",
      dataIndex: "tuesday",
      key: "tuesday",
      width: 200,
    },
    {
      title: "Miércoles",
      dataIndex: "wednesday",
      key: "wednesday",
      width: 200,
    },
    {
      title: "Jueves",
      dataIndex: "thursday",
      key: "thursday",
      width: 200,
    },
    {
      title: "Viernes",
      dataIndex: "friday",
      key: "friday",
      width: 200,
    },
  ];

  const data = [];
  for (let i = 7; i < 20; i++) {
    let daysByHour = {};
    days.forEach((day) => {
      daysByHour[day] = (
        <Item
          name={[day, i]}
          initialValue={scheduleData && scheduleData[day][i]}
        >
          <Switch
            defaultChecked={scheduleData && scheduleData[day][i]}
            className="schedule-form__switch"
            onChange={handleScheduleChange}
          />
        </Item>
      );
    });

    data.push({
      key: i,
      hour: `${i}h00 - ${i + 1}h00`,
      ...daysByHour,
    });
  }

  return (
    <Table
      pagination={false}
      columns={columns}
      className="schedule-form__table"
      dataSource={data}
      size={"large"}
      bordered
      title={() =>
        hoursSelected < 1 ? (
          <Alert
            message={`Selecciona ${
              scheduleFor === "profesor"
                ? "las horas en las que el profesor está disponible"
                : "el horario de la comisión"
            }`}
            banner
            type="error"
          />
        ) : (
          <Alert
            message="Asegúrate de que el horario esté ingresado correctamente"
            banner
            type="info"
          />
        )
      }
    />
  );
};
