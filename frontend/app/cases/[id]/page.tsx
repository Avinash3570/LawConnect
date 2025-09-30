import { CaseDetail } from "@/components/cases/case-detail"

export default function CasePage({ params }: { params: { id: string } }) {
  return <CaseDetail caseId={params.id} />
}
