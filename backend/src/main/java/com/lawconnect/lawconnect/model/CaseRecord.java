package com.lawconnect.lawconnect.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CaseRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String caseTitle;

    private String caseType;

    private String caseStatus;

    private String hearingDate;

    private String description;

    @ManyToOne
    @JoinColumn(name = "lawyer_id")
    private Lawyer lawyer;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
}
