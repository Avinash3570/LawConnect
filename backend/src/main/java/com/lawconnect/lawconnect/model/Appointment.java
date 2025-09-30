package com.lawconnect.lawconnect.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;




@Entity
public class Appointment {
  public static final String Scheduled = null;

  @Id
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  private Long id;

  private LocalDateTime dateTime;

  private String description;
  
  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  private String status = Scheduled;

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public LocalDateTime getDateTime() {
    return dateTime;
  }

  public void setDateTime(LocalDateTime dateTime) {
    this.dateTime = dateTime;
  }

  

  

  public Lawyer getLawyer() {
    return lawyer;
  }

  public void setLawyer(Lawyer lawyer) {
    this.lawyer = lawyer;
  }

  public Client getClient() {
    return client;
  }

  public void setClient(Client client) {
    this.client = client;
  }

  @ManyToOne
  @JoinColumn(name="lawyer_id")
  private Lawyer lawyer;

  @ManyToOne
  @JoinColumn(name = "client_id")
  private Client client;


}
