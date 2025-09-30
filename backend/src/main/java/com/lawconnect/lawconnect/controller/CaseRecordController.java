package com.lawconnect.lawconnect.controller;

import com.lawconnect.lawconnect.model.CaseRecord;
import com.lawconnect.lawconnect.service.CaseRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cases")
@RequiredArgsConstructor
public class CaseRecordController {

    private final CaseRecordService caseRecordService;

    //  Only ADMIN and LAWYER can create a case
    @PostMapping
    //@PreAuthorize("hasAnyRole('ADMIN', 'LAWYER')")
    public ResponseEntity<CaseRecord> createCase(@RequestBody CaseRecord caseRecord) {
        return ResponseEntity.status(201).body(caseRecordService.createCase(caseRecord));
    }

    //  All roles can view all cases
    @GetMapping
    //@PreAuthorize("hasAnyRole('ADMIN', 'LAWYER', 'CLIENT')")
    public List<CaseRecord> getAllCases() {
        return caseRecordService.getAllCases();
    }

    //  All roles can view a specific case
    @GetMapping("/{id}")
    //@PreAuthorize("hasAnyRole('ADMIN', 'LAWYER', 'CLIENT')")
    public ResponseEntity<CaseRecord> getCaseById(@PathVariable Long id) {
        return caseRecordService.getCaseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //  Only ADMIN and LAWYER can update a case
    @PutMapping("/{id}")
    //@PreAuthorize("hasAnyRole('ADMIN', 'LAWYER')")
    public ResponseEntity<CaseRecord> updateCase(@PathVariable Long id, @RequestBody CaseRecord updatedCase) {
        return ResponseEntity.ok(caseRecordService.updateCase(id, updatedCase));
    }

    //  Only ADMIN can delete a case
    @DeleteMapping("/{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCase(@PathVariable Long id) {
        caseRecordService.deleteCase(id);
        return ResponseEntity.noContent().build();
    }
}
