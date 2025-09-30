package com.lawconnect.lawconnect.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lawconnect.lawconnect.model.Client;
import com.lawconnect.lawconnect.repository.ClientRepository;

@Service
public class ClientService {

  @Autowired
  private ClientRepository clientRepository;
  public Client createClient(Client client){
    
    if(clientRepository.existsByEmail(client.getEmail())){
      throw new RuntimeException("Client with this Email already exists!!!");
    }

    return clientRepository.save(client);
  }

  public List<Client> getAllClients(){
    return clientRepository.findAll();
  }
  public Client getClientById(Long id){
    return clientRepository.findById(id).orElseThrow(()->new RuntimeException("Client not found with id: " + id));
  }
  public void deleteClient(Long id){
    clientRepository.deleteById(id);
  }
  public Client updateClient(Long id, Client updatedClient){
    Client client = getClientById(id);
    client.setName(updatedClient.getName());
    client.setAddress(updatedClient.getAddress());
    client.setPhoneNumber(updatedClient.getPhoneNumber());
    return clientRepository.save(client);
  }
  
}
