import List "mo:core/List";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  // External state for user management
  let accessControlState = AccessControl.initState();

  // Mixin inclusion for user management
  include MixinAuthorization(accessControlState);

  // Types
  type Inquiry = {
    name : Text;
    message : Text;
    phone : Text;
    service : Text;
    timestamp : Int;
  };

  type ContactSubmission = {
    name : Text;
    message : Text;
    phone : Text;
    timestamp : Int;
  };

  public type Pricing = {
    basicWebsite : Nat;
    standardWebsite : Nat;
    landingPage : Nat;
    domainSetup : Nat;
    hostingSetup : Nat;
    googleConsole : Nat;
    googleProfile : Nat;
    maintenance : Nat;
    logoDesign : Nat;
  };

  public type Service = {
    name : Text;
    description : Text;
    price : Nat;
  };

  public type PaymentTerms = {
    advance : Nat;
    afterCompletion : Nat;
  };

  public type WorkProcessStep = {
    stepNumber : Nat;
    title : Text;
    description : Text;
  };

  // State
  let contactSubmissions = Map.empty<Principal, List.List<ContactSubmission>>();
  let serviceInquiries = Map.empty<Principal, List.List<Inquiry>>();

  // Save contact form submission
  public shared ({ caller }) func saveContactSubmission(name : Text, message : Text, phone : Text, timestamp : Int) : async () {
    if (name.isEmpty()) {
      Runtime.trap("Name field cannot be empty. Fill krlo bhai.");
    };

    let submission : ContactSubmission = {
      name;
      message;
      phone;
      timestamp;
    };

    let existingList = switch (contactSubmissions.get(caller)) {
      case (?lst) { lst };
      case (null) { List.empty<ContactSubmission>() };
    };

    existingList.add(submission);
    contactSubmissions.add(caller, existingList);
  };

  // Save service inquiry
  public shared ({ caller }) func saveServiceInquiry(name : Text, message : Text, phone : Text, service : Text, timestamp : Int) : async () {
    if (service.isEmpty()) {
      Runtime.trap("Please select a service. Service select krna pdega bhai.");
    };

    let inquiry : Inquiry = {
      name;
      message;
      phone;
      service;
      timestamp;
    };

    let existingList = switch (serviceInquiries.get(caller)) {
      case (?lst) { lst };
      case (null) { List.empty<Inquiry>() };
    };

    existingList.add(inquiry);
    serviceInquiries.add(caller, existingList);
  };

  // Get submissions by principal (caller can only view their own, or admin can view any)
  public query ({ caller }) func getContactSubmissions(callerPrincipal : Principal) : async [ContactSubmission] {
    if (caller != callerPrincipal and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own submissions or be an admin");
    };

    switch (contactSubmissions.get(callerPrincipal)) {
      case (null) { [] };
      case (?list) { list.toArray() };
    };
  };

  // Get inquiries by principal (caller can only view their own, or admin can view any)
  public query ({ caller }) func getServiceInquiries(callerPrincipal : Principal) : async [Inquiry] {
    if (caller != callerPrincipal and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own inquiries or be an admin");
    };

    switch (serviceInquiries.get(callerPrincipal)) {
      case (null) { [] };
      case (?list) { list.toArray() };
    };
  };

  // Delete specific submission (Admin only)
  public shared ({ caller }) func deleteContactSubmission(callerPrincipal : Principal, timestamp : Int) : async Bool {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can delete submissions");
    };

    switch (contactSubmissions.get(callerPrincipal)) {
      case (null) { false };
      case (?list) {
        let filteredList = list.filter(func(submission) { submission.timestamp != timestamp });
        if (filteredList.size() == list.size()) { return false };
        if (filteredList.isEmpty()) {
          contactSubmissions.remove(callerPrincipal);
        } else {
          contactSubmissions.add(callerPrincipal, filteredList);
        };
        true;
      };
    };
  };

  // Delete specific inquiry (Admin only)
  public shared ({ caller }) func deleteServiceInquiry(callerPrincipal : Principal, timestamp : Int) : async Bool {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can delete inquiries");
    };

    switch (serviceInquiries.get(callerPrincipal)) {
      case (null) { false };
      case (?list) {
        let filteredList = list.filter(func(inquiry) { inquiry.timestamp != timestamp });
        if (filteredList.size() == list.size()) { return false };
        if (filteredList.isEmpty()) {
          serviceInquiries.remove(callerPrincipal);
        } else {
          serviceInquiries.add(callerPrincipal, filteredList);
        };
        true;
      };
    };
  };

  // Get all submissions (Admin only)
  public query ({ caller }) func getAllContactSubmissions() : async [(Principal, [ContactSubmission])] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can view all submissions");
    };
    contactSubmissions.entries().toArray().map(
      func((principal, list)) { (principal, list.toArray()) }
    );
  };

  // Get all inquiries (Admin only)
  public query ({ caller }) func getAllServiceInquiries() : async [(Principal, [Inquiry])] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can view all inquiries");
    };
    serviceInquiries.entries().toArray().map(
      func((principal, list)) { (principal, list.toArray()) }
    );
  };

  // Clear all submissions (Admin only)
  public shared ({ caller }) func clearAllSubmissions() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can clear all submissions");
    };
    contactSubmissions.clear();
  };

  // Clear all inquiries (Admin only)
  public shared ({ caller }) func clearAllInquiries() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can clear all inquiries");
    };
    serviceInquiries.clear();
  };

  // Get count of submissions (Admin only - sensitive business metric)
  public query ({ caller }) func getContactSubmissionsCount() : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can view submission counts");
    };
    contactSubmissions.size();
  };

  // Get count of inquiries (Admin only - sensitive business metric)
  public query ({ caller }) func getServiceInquiriesCount() : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can view inquiry counts");
    };
    serviceInquiries.size();
  };

  // Custom Data - Public functions
  public func getPricing() : async Pricing {
    {
      basicWebsite = 3149;
      standardWebsite = 6299;
      landingPage = 2249;
      domainSetup = 499;
      hostingSetup = 799;
      googleConsole = 899;
      googleProfile = 899;
      maintenance = 1000;
      logoDesign = 300;
    };
  };

  public func getServices() : async [Service] {
    let services = List.empty<Service>();
    services.add({
      name = "Business Website Design";
      description = "Professional websites for businesses.";
      price = 3149;
    });
    services.add({
      name = "Personal Portfolio";
      description = "Showcase your work online.";
      price = 3149;
    });
    services.add({
      name = "Landing Page";
      description = "Single page for ads and promotions.";
      price = 2249;
    });
    services.add({
      name = "Solar / Shop / Coaching Website";
      description = "Websites for specific businesses.";
      price = 6299;
    });
    services.add({
      name = "Website Redesign";
      description = "Modernize your existing site.";
      price = 3149;
    });
    services.add({
      name = "Responsive Design";
      description = "Mobile-friendly websites.";
      price = 0;
    });
    services.add({
      name = "Fast Loading Websites";
      description = "Optimized for speed.";
      price = 0;
    });
    services.add({
      name = "Basic SEO Setup";
      description = "Search engine optimization basics.";
      price = 899;
    });
    services.toArray();
  };

  public func getPaymentTerms() : async PaymentTerms {
    { advance = 50; afterCompletion = 50 };
  };

  public func getWorkProcessSteps() : async [WorkProcessStep] {
    let steps = [
      {
        stepNumber = 1;
        title = "Requirement Discussion";
        description = "Discuss project details and requirements.";
      },
      {
        stepNumber = 2;
        title = "Design Approval";
        description = "Approve the website design layout.";
      },
      {
        stepNumber = 3;
        title = "Development";
        description = "Website development and implementation.";
      },
      {
        stepNumber = 4;
        title = "Final Review";
        description = "Review and finalize the completed website.";
      },
    ];
    steps;
  };

  // Test method
  public func testMessage() : async Text {
    "Backend running successfully";
  };
};
