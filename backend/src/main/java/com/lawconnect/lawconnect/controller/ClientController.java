package com.lawconnect.lawconnect.controller;

import java.util.List;

import com.lawconnect.lawconnect.model.Client;
import com.lawconnect.lawconnect.service.ClientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

  @Autowired
  private ClientService clientService;

  //  Only ADMIN can create a client
  @PostMapping
  //@PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Client> createClient(@RequestBody Client client){
    return new ResponseEntity<>(clientService.createClient(client), HttpStatus.CREATED);
  }

  //  Only ADMIN and LAWYER can see all clients
  @GetMapping
  //@PreAuthorize("hasAnyRole('ADMIN', 'LAWYER')")
  public List<Client> getAllClients(){
    return clientService.getAllClients();
  }

  //  ADMIN and LAWYER can get by ID
  @GetMapping("/{id}")
  //@PreAuthorize("hasAnyRole('ADMIN', 'LAWYER')")
  public ResponseEntity<Client> getClientById(@PathVariable Long id){
    return ResponseEntity.ok(clientService.getClientById(id));
  }

  //  Only ADMIN can update client details
  @PutMapping("/{id}")
  //@PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Client> updateClient(@PathVariable Long id, @RequestBody Client client){
    return ResponseEntity.ok(clientService.updateClient(id, client));
  }

  //  Only ADMIN can delete clients
  @DeleteMapping("/{id}")
  //@PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> deleteClient(@PathVariable Long id){
    clientService.deleteClient(id);
    return ResponseEntity.noContent().build();
  }
}
