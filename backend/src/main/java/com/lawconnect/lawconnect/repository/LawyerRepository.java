package com.lawconnect.lawconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lawconnect.lawconnect.model.Lawyer;

public interface LawyerRepository extends JpaRepository<Lawyer, Long> {
}
