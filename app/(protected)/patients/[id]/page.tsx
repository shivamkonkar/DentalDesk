import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  MapPin,
  User,
  Calendar,
  Droplets,
  AlertTriangle,
  Users,
  ClipboardList,
  Eye,
} from "lucide-react";
import React from "react";
import {
  getPatientOutput,
  getPatient,
  getChiefComplaints,
  getChiefComplaintsOutput,
} from "@/lib/actions/patientActions";
import { notFound } from "next/navigation";
import { AddChiefComplaint } from "@/components/patient/AddChiefComplaintDialog";

async function getPatientData(id: string) {
  const fetchPatient: getPatientOutput = await getPatient(id);
  if (fetchPatient.error || !fetchPatient.patient) {
    notFound();
  }

  const chiefComplaints: getChiefComplaintsOutput = await getChiefComplaints(
    id
  );

  return { ...fetchPatient.patient, chiefComplaints };
}

interface PatientDetailsPageProps {
  params: { id: string };
}

function calculateAge(dob: Date | string): number {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export default async function PatientDetailsPage({
  params,
}: PatientDetailsPageProps) {
  const patientId = await params;
  const patientData = await getPatientData(patientId.id);
  const chiefComplaints = patientData.chiefComplaints;

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadgeClass = (status: string | null) => {
    switch (status) {
      case "ACTIVE":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "RESOLVED":
        return "bg-green-100 text-green-800 border-green-200";
      case "UNDER_OBSERVATION":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const formatBloodGroup = () => {
    if (patientData.bloodGroupType === "OTHERS") {
      return patientData.bloodGroupOtherDetails || "Not specified";
    }
    return `${patientData.bloodGroupType} ${
      patientData.bloodGroupRh === "POSITIVE" ? "+" : "-"
    }`;
  };

  // Medical conditions mapping
  const medicalConditions = [
    { key: "hasDiabetes", label: "Diabetes" },
    { key: "hasHypertension", label: "Hypertension" },
    { key: "isPregnant", label: "Pregnancy" },
    { key: "hasCancerHistory", label: "Cancer History" },
    { key: "hasHiv", label: "HIV" },
    { key: "hasKnownAllergies", label: "Known Allergies" },
    { key: "hasAsthma", label: "Asthma" },
    { key: "hasBleedingDisorders", label: "Bleeding Disorders" },
    { key: "hasHeartConditions", label: "Heart Conditions" },
  ];

  // Filter conditions that are true
  const activeMedicalConditions = medicalConditions.filter(
    (condition) =>
      patientData[condition.key as keyof typeof patientData] === true
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 px-4 md:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Patients
            </Button>
          </div>
          <div className="text-base md:text-lg font-semibold text-slate-800">
            DentalDesk
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              {patientData.fullName}
            </h1>
            <p className="text-lg text-slate-600">
              {patientData.dob !== null
                ? calculateAge(patientData.dob) + " years old • "
                : null}{" "}
              {patientData.gender}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-blue-700 hover:bg-blue-800 text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit Patient Details
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-700" />
                  Personal & Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="text-sm font-medium text-slate-600">
                        Phone Number
                      </div>
                      <div className="text-base text-slate-800">
                        {patientData.phone}
                      </div>
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="text-sm font-medium text-slate-600">
                        Date of Birth
                      </div>
                      <div className="text-base text-slate-800">
                        {patientData.dob !== null ? (
                          formatDate(patientData.dob)
                        ) : (
                          <p className="text-slate-500">N/A</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="text-sm font-medium text-slate-600">
                        Email Address
                      </div>
                      <div className="text-base text-slate-800">
                        {patientData.email}
                      </div>
                    </div>
                  </div>

                  {/* Locality */}
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="text-sm font-medium text-slate-600">
                        Locality
                      </div>
                      <div className="text-base text-slate-800">
                        {patientData.locality}
                      </div>
                    </div>
                  </div>

                  {/* Profession */}
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="text-sm font-medium text-slate-600">
                        Profession
                      </div>
                      <div className="text-base text-slate-800">
                        {patientData.profession}
                      </div>
                    </div>
                  </div>

                  {/* Blood Group */}
                  <div className="flex items-center space-x-3">
                    <Droplets className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="text-sm font-medium text-slate-600">
                        Blood Group
                      </div>
                      <div className="text-base text-slate-800">
                        {formatBloodGroup()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Medical History */}
            <Card className="border-slate-200 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-blue-700" />
                  Medical History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeMedicalConditions.length > 0 ? (
                  <div className="space-y-3">
                    {activeMedicalConditions.map((condition) => (
                      <div
                        key={condition.key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-slate-700">
                          {condition.label}
                        </span>
                        <Badge
                          variant="destructive"
                          className="bg-red-100 text-red-800 border-red-200"
                        >
                          Yes
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 italic">
                    No medical conditions reported
                  </p>
                )}

                {patientData.otherMedicalCondition && (
                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <div className="text-sm font-medium text-slate-600 mb-2">
                      Other Conditions & Allergy Details
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-slate-800 text-sm leading-relaxed">
                        {patientData.otherMedicalCondition}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-slate-200 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-700" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-slate-600">
                      Contact Name
                    </div>
                    <div className="text-base text-slate-800 font-semibold">
                      {patientData.emergencyContactName}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="text-sm font-medium text-slate-600">
                        Phone Number
                      </div>
                      <div className="text-base text-slate-800">
                        {patientData.emergencyContactPhone}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Chief Complaints Section */}
        <div className="mt-8">
          <Card className="border-slate-200 shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center">
                  <ClipboardList className="w-5 h-5 mr-2 text-blue-700" />
                  Chief Complaints
                </CardTitle>
                <AddChiefComplaint patientId={patientId.id} />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Date</TableHead>
                    <TableHead>Complaint</TableHead>
                    <TableHead className="w-[120px]">Location</TableHead>
                    <TableHead className="w-[140px]">Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chiefComplaints.complaints!.map((complaint, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-slate-700">
                        {complaint.createdAt.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md">
                          <div className="font-medium text-slate-800">
                            {complaint.chiefComplaint}
                          </div>
                          <div className="text-sm text-slate-600 mt-1 line-clamp-2">
                            {complaint.chiefComplaintDescription}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-700">
                        {complaint.location}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusBadgeClass(complaint.status)}
                        >
                          {complaint.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-700 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
