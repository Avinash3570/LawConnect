package com.lawconnect.lawconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lawconnect.lawconnect.model.CaseRecord;

public interface CaseRecordRepository extends JpaRepository<CaseRecord,Long> {
  
}
