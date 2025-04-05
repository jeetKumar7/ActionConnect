
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ExternalLink, ThumbsUp, Calendar, MapPin, DollarSign, BookOpen, GraduationCap, Users, HeartHandshake } from "lucide-react";

type ResourceCategory = "ngos" | "activists" | "scientific" | "funding" | "educational";

type Resource = {
  id: string;
  name: string;
  description: string;
  category: ResourceCategory;
  url: string;
  image: string;
  location?: string;
  date?: string;
  causes: string[];
  highlights?: string[];
};

const ActionHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ResourceCategory>("ngos");

  // Mock data for resources
  const resources: Resource[] = [
    // NGOs
    {
      id: "ngo1",
      name: "Global Climate Initiative",
      description: "International organization dedicated to fighting climate change through policy advocacy, community engagement, and sustainable development projects.",
      category: "ngos",
      url: "https://example.org/climate-initiative",
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      location: "Global",
      causes: ["climate", "conservation", "sustainable-development"],
      highlights: [
        "Active in 50+ countries worldwide",
        "Successfully advocated for climate legislation",
        "Planted over 10 million trees globally"
      ]
    },
    {
      id: "ngo2",
      name: "Education for All Foundation",
      description: "Working to ensure that all children have access to quality education regardless of their socioeconomic background or geographic location.",
      category: "ngos",
      url: "https://example.org/education-for-all",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      location: "Global",
      causes: ["education", "equality", "poverty"],
      highlights: [
        "Built 250+ schools in developing countries",
        "Provided scholarships to 10,000+ students",
        "Developed curriculum for underserved communities"
      ]
    },
    {
      id: "ngo3",
      name: "Ocean Conservation Alliance",
      description: "Dedicated to protecting marine ecosystems through research, advocacy, and hands-on conservation projects aimed at reducing pollution and preserving biodiversity.",
      category: "ngos",
      url: "https://example.org/ocean-alliance",
      image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      location: "International",
      causes: ["conservation", "climate", "sustainable-development"],
      highlights: [
        "Conducted major ocean cleanup campaigns",
        "Protected critical marine habitats",
        "Rescued and rehabilitated endangered marine species"
      ]
    },
    
    // Activist Groups
    {
      id: "act1",
      name: "Youth Climate Strikers",
      description: "Global movement of young people demanding urgent action on climate change through school strikes, public demonstrations, and political engagement.",
      category: "activists",
      url: "https://example.org/youth-climate",
      image: "https://images.unsplash.com/photo-1573225342350-16731dd9bf3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      location: "Global",
      date: "Ongoing",
      causes: ["climate", "youth-empowerment", "policy-change"],
      highlights: [
        "Organized strikes in 100+ countries",
        "Influenced climate policy discussions",
        "Mobilized millions of young activists"
      ]
    },
    {
      id: "act2",
      name: "Digital Rights Defenders",
      description: "Coalition working to protect privacy, free speech, and equal access in the digital realm through advocacy, education, and technical solutions.",
      category: "activists",
      url: "https://example.org/digital-rights",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      location: "Online",
      causes: ["equality", "innovation", "policy-change"],
      highlights: [
        "Provided digital security training to activists",
        "Successfully challenged surveillance legislation",
        "Developed open-source privacy tools"
      ]
    },
    {
      id: "act3",
      name: "Community Food Justice Alliance",
      description: "Grassroots movement addressing food inequity by creating community gardens, supporting local farmers, and advocating for food system reform.",
      category: "activists",
      url: "https://example.org/food-justice",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      location: "United States",
      causes: ["hunger", "poverty", "community", "sustainable-development"],
      highlights: [
        "Established 50+ community gardens",
        "Distributed fresh produce to food deserts",
        "Created farm-to-table programs in schools"
      ]
    },
    
    // Scientific Organizations
    {
      id: "sci1",
      name: "Biodiversity Research Institute",
      description: "Scientific organization conducting groundbreaking research on biodiversity loss, ecological restoration, and conservation strategies.",
      category: "scientific",
      url: "https://example.org/biodiversity-institute",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      location: "International",
      causes: ["conservation", "climate", "innovation"],
      highlights: [
        "Published 200+ peer-reviewed studies",
        "Discovered 15 new species",
        "Developed innovative conservation methodologies"
      ]
    },
    {
      id: "sci2",
      name: "Global Health Research Collaborative",
      description: "Network of scientists and health professionals working to address global health challenges through research, innovation, and capacity building.",
      category: "scientific",
      url: "https://example.org/health-collaborative",
      image: "https://images.unsplash.com/photo-1559757175-7cb013ad2012?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      location: "Global",
      causes: ["healthcare", "innovation", "equality"],
      highlights: [
        "Led breakthrough research on disease prevention",
        "Trained healthcare workers in 30+ countries",
        "Developed affordable medical technologies"
      ]
    },
    {
      id: "sci3",
      name: "Sustainable Energy Institute",
      description: "Research organization focused on advancing renewable energy technologies, energy storage solutions, and sustainable infrastructure.",
      category: "scientific",
      url: "https://example.org/energy-institute",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      location: "Global",
      causes: ["climate", "innovation", "sustainable-development"],
      highlights: [
        "Pioneered advancements in solar efficiency",
        "Developed community-scale energy solutions",
        "Created open-source sustainable designs"
      ]
    },
    
    // Funding Opportunities
    {
      id: "fund1",
      name: "Social Impact Grant Program",
      description: "Provides funding to innovative projects addressing critical social and environmental challenges with a focus on scalable, sustainable solutions.",
      category: "funding",
      url: "https://example.org/impact-grants",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      date: "Applications open January 15 annually",
      causes: ["innovation", "community", "sustainable-development"],
      highlights: [
        "Grants ranging from $5,000 to $50,000",
        "Supported 200+ projects in 40 countries",
        "Focus on innovative, scalable solutions"
      ]
    },
    {
      id: "fund2",
      name: "Community Action Fund",
      description: "Grassroots funding initiative supporting local community projects, neighborhood improvements, and small-scale social enterprises.",
      category: "funding",
      url: "https://example.org/community-fund",
      image: "https://images.unsplash.com/photo-1593113598332-cd59a9e0e61a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      date: "Quarterly application cycles",
      causes: ["community", "equality", "poverty"],
      highlights: [
        "Micro-grants of $500 to $5,000",
        "Rapid funding with simplified application",
        "Priority to underserved communities"
      ]
    },
    {
      id: "fund3",
      name: "Environmental Action Accelerator",
      description: "Funding program specifically for projects addressing climate change, conservation, and environmental sustainability with measurable impacts.",
      category: "funding",
      url: "https://example.org/environmental-accelerator",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      date: "Rolling applications, reviewed monthly",
      causes: ["climate", "conservation", "sustainable-development"],
      highlights: [
        "Funding range: $10,000 to $100,000",
        "Includes mentorship and technical assistance",
        "Focus on innovative climate solutions"
      ]
    },
    
    // Educational Resources
    {
      id: "edu1",
      name: "Global Citizenship Education Hub",
      description: "Comprehensive resource center providing curricula, lesson plans, and interactive materials for educators on global issues and social responsibility.",
      category: "educational",
      url: "https://example.org/global-citizenship",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      causes: ["education", "equality", "community"],
      highlights: [
        "Free materials for K-12 educators",
        "Translated into 20+ languages",
        "Interactive activities and virtual exchanges"
      ]
    },
    {
      id: "edu2",
      name: "Activist Toolkit",
      description: "Practical guide for aspiring activists covering organizing strategies, communication skills, coalition building, and self-care for sustained engagement.",
      category: "educational",
      url: "https://example.org/activist-toolkit",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      causes: ["community", "equality", "policy-change"],
      highlights: [
        "Step-by-step campaign planning guides",
        "Digital organizing strategies",
        "Templates for effective communication"
      ]
    },
    {
      id: "edu3",
      name: "Sustainable Living Course",
      description: "Free online course teaching practical skills for environmentally conscious living, including renewable energy, zero waste practices, and sustainable food systems.",
      category: "educational",
      url: "https://example.org/sustainable-living",
      image: "https://images.unsplash.com/photo-1582292325642-922fd9c2b1a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      causes: ["climate", "sustainable-development", "community"],
      highlights: [
        "6-week self-paced online curriculum",
        "Hands-on projects and challenges",
        "Community forum for participant exchange"
      ]
    },
  ];

  // Filter resources based on active tab and search query
  const filteredResources = resources.filter((resource) => {
    const matchesTab = resource.category === activeTab;
    const matchesSearch = searchQuery === "" || 
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.causes.some(cause => cause.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  // Get icon for each category
  const getCategoryIcon = (category: ResourceCategory) => {
    switch (category) {
      case "ngos":
        return <HeartHandshake className="h-5 w-5" />;
      case "activists":
        return <Users className="h-5 w-5" />;
      case "scientific":
        return <BookOpen className="h-5 w-5" />;
      case "funding":
        return <DollarSign className="h-5 w-5" />;
      case "educational":
        return <GraduationCap className="h-5 w-5" />;
    }
  };

  // Get category display name
  const getCategoryName = (category: ResourceCategory) => {
    switch (category) {
      case "ngos":
        return "NGOs & Nonprofits";
      case "activists":
        return "Activist Groups";
      case "scientific":
        return "Scientific Organizations";
      case "funding":
        return "Funding Opportunities";
      case "educational":
        return "Educational Resources";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-navy-700">Action Hub</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Find resources, organizations, and opportunities to turn your passion into meaningful action. 
              Connect with NGOs, activist groups, and access funding and educational tools.
            </p>
            
            {/* Search */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search for resources, causes, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Resource Tabs */}
          <Tabs defaultValue="ngos" onValueChange={(value) => setActiveTab(value as ResourceCategory)}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white">
                <TabsTrigger value="ngos" className="flex items-center gap-1">
                  <HeartHandshake className="h-4 w-4" />
                  <span className="hidden sm:inline">NGOs & Nonprofits</span>
                  <span className="sm:hidden">NGOs</span>
                </TabsTrigger>
                <TabsTrigger value="activists" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Activist Groups</span>
                  <span className="sm:hidden">Activists</span>
                </TabsTrigger>
                <TabsTrigger value="scientific" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Scientific Organizations</span>
                  <span className="sm:hidden">Science</span>
                </TabsTrigger>
                <TabsTrigger value="funding" className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="hidden sm:inline">Funding Opportunities</span>
                  <span className="sm:hidden">Funding</span>
                </TabsTrigger>
                <TabsTrigger value="educational" className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">Educational Resources</span>
                  <span className="sm:hidden">Education</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Tab Content */}
            <TabsContent value="ngos">
              <ResourceGrid resources={filteredResources} />
            </TabsContent>
            <TabsContent value="activists">
              <ResourceGrid resources={filteredResources} />
            </TabsContent>
            <TabsContent value="scientific">
              <ResourceGrid resources={filteredResources} />
            </TabsContent>
            <TabsContent value="funding">
              <ResourceGrid resources={filteredResources} />
            </TabsContent>
            <TabsContent value="educational">
              <ResourceGrid resources={filteredResources} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const ResourceGrid = ({ resources }: { resources: Resource[] }) => {
  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No resources found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
};

const ResourceCard = ({ resource }: { resource: Resource }) => {
  // Get icon for each category
  const getCategoryIcon = (category: ResourceCategory) => {
    switch (category) {
      case "ngos":
        return <HeartHandshake className="h-5 w-5" />;
      case "activists":
        return <Users className="h-5 w-5" />;
      case "scientific":
        return <BookOpen className="h-5 w-5" />;
      case "funding":
        return <DollarSign className="h-5 w-5" />;
      case "educational":
        return <GraduationCap className="h-5 w-5" />;
    }
  };

  return (
    <Card className="overflow-hidden card-hover">
      <div className="relative h-48 overflow-hidden">
        <img
          src={resource.image}
          alt={resource.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="flex items-center gap-1 bg-white/90">
            {getCategoryIcon(resource.category)}
            <span>
              {resource.category === "ngos" ? "NGO" : 
               resource.category === "activists" ? "Activist Group" :
               resource.category === "scientific" ? "Scientific Org" :
               resource.category === "funding" ? "Funding" : "Educational"}
            </span>
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{resource.name}</CardTitle>
        {(resource.location || resource.date) && (
          <CardDescription className="flex flex-wrap gap-3">
            {resource.location && (
              <span className="flex items-center text-xs text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                {resource.location}
              </span>
            )}
            {resource.date && (
              <span className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {resource.date}
              </span>
            )}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm line-clamp-3">{resource.description}</p>
        
        {resource.highlights && (
          <div className="mt-4">
            <h4 className="text-xs font-medium text-gray-500 mb-2">HIGHLIGHTS</h4>
            <ul className="space-y-1">
              {resource.highlights.map((highlight, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <ThumbsUp className="h-3 w-3 text-teal-400 mr-2 mt-0.5" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-4 flex flex-wrap gap-2">
          {resource.causes.slice(0, 3).map((cause) => (
            <Badge key={cause} variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
              {cause.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Badge>
          ))}
          {resource.causes.length > 3 && (
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
              +{resource.causes.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-teal-400 hover:bg-teal-500">
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            Visit Website
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActionHub;
