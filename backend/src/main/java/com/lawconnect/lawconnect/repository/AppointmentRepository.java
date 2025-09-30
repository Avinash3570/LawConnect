package com.lawconnect.lawconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lawconnect.lawconnect.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
  
}
