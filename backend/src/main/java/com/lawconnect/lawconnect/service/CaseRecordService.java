package com.lawconnect.lawconnect.service;

import com.lawconnect.lawconnect.model.CaseRecord;
import com.lawconnect.lawconnect.repository.CaseRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CaseRecordService {

    private final CaseRecordRepository caseRecordRepository;

    public CaseRecord createCase(CaseRecord caseRecord) {
        return caseRecordRepository.save(caseRecord);
    }

    public List<CaseRecord> getAllCases() {
        return caseRecordRepository.findAll();
    }

    public Optional<CaseRecord> getCaseById(Long id) {
        return caseRecordRepository.findById(id);
    }

    public void deleteCase(Long id) {
        caseRecordRepository.deleteById(id);
    }

    public CaseRecord updateCase(Long id, CaseRecord updatedCase) {
        return caseRecordRepository.findById(id).map(existing -> {
            existing.setCaseTitle(updatedCase.getCaseTitle());
            existing.setCaseType(updatedCase.getCaseType());
            existing.setCaseStatus(updatedCase.getCaseStatus());
            existing.setHearingDate(updatedCase.getHearingDate());
            existing.setDescription(updatedCase.getDescription());
            existing.setLawyer(updatedCase.getLawyer());
            existing.setClient(updatedCase.getClient());
            return caseRecordRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Case not found with id: " + id));
    }
}
