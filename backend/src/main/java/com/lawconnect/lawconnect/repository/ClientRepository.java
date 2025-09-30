package com.lawconnect.lawconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lawconnect.lawconnect.model.Client;

public interface ClientRepository extends JpaRepository<Client,Long> {
  boolean existsByEmail(String Email);
  
}
