
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, FileText, Film, Bookmark, Search, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ContentType = "all" | "videos" | "books" | "articles" | "documentaries" | "talks";

type ContentItem = {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  thumbnail: string;
  url: string;
  tags: string[];
  date: string;
};

const ContentLibrary = () => {
  const [activeTab, setActiveTab] = useState<ContentType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for content items
  const contentItems: ContentItem[] = [
    {
      id: "1",
      title: "How Ocean Plastic Pollution Impacts Our Planet",
      description: "An eye-opening documentary about the devastating effects of plastic pollution on marine ecosystems and what we can do to help.",
      type: "documentaries",
      thumbnail: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      url: "https://example.com/ocean-plastic-documentary",
      tags: ["environment", "ocean", "pollution", "conservation"],
      date: "2023-08-15",
    },
    {
      id: "2",
      title: "Climate Action: A Practical Guide",
      description: "A comprehensive book on climate change with actionable steps that individuals can take to make a difference in their communities.",
      type: "books",
      thumbnail: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      url: "https://example.com/climate-action-book",
      tags: ["climate", "environment", "activism", "guide"],
      date: "2023-06-20",
    },
    {
      id: "3",
      title: "The Power of Community-Led Education Initiatives",
      description: "A TED talk exploring how grassroots education projects are transforming communities and creating opportunities for underserved populations.",
      type: "talks",
      thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      url: "https://example.com/community-education-ted-talk",
      tags: ["education", "community", "social change", "opportunity"],
      date: "2023-09-05",
    },
    {
      id: "4",
      title: "Sustainable Agriculture: Feeding the Future",
      description: "An informative article on innovative farming practices that are environmentally friendly and capable of meeting global food demands.",
      type: "articles",
      thumbnail: "https://images.unsplash.com/photo-1500651230702-0e2d8e49e5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      url: "https://example.com/sustainable-agriculture-article",
      tags: ["agriculture", "sustainability", "food security", "innovation"],
      date: "2023-07-12",
    },
    {
      id: "5",
      title: "Clean Water Access: Global Challenges and Solutions",
      description: "A video series examining the water crisis affecting billions worldwide and showcasing innovative solutions being implemented globally.",
      type: "videos",
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      url: "https://example.com/clean-water-video-series",
      tags: ["water", "global health", "human rights", "development"],
      date: "2023-08-28",
    },
    {
      id: "6",
      title: "Renewable Energy Revolution",
      description: "A documentary that explores the rapid advancement of renewable energy technologies and their potential to transform our energy systems.",
      type: "documentaries",
      thumbnail: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      url: "https://example.com/renewable-energy-documentary",
      tags: ["energy", "climate", "technology", "sustainability"],
      date: "2023-05-18",
    },
    {
      id: "7",
      title: "The Art of Compassionate Leadership",
      description: "A book that teaches how empathy and compassion in leadership can drive positive social change in organizations and communities.",
      type: "books",
      thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      url: "https://example.com/compassionate-leadership-book",
      tags: ["leadership", "compassion", "business", "social impact"],
      date: "2023-04-30",
    },
    {
      id: "8",
      title: "Empowering Women in STEM",
      description: "An inspiring talk about initiatives that are breaking down barriers and creating opportunities for women in science, technology, engineering, and mathematics.",
      type: "talks",
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      url: "https://example.com/women-in-stem-talk",
      tags: ["gender equality", "STEM", "education", "empowerment"],
      date: "2023-09-12",
    },
  ];

  // Filter content based on active tab and search query
  const filteredContent = contentItems.filter((item) => {
    const matchesTab = activeTab === "all" || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  // Get icon based on content type
  const getContentIcon = (type: ContentType) => {
    switch (type) {
      case "videos":
        return <Video className="h-5 w-5" />;
      case "books":
        return <BookOpen className="h-5 w-5" />;
      case "articles":
        return <FileText className="h-5 w-5" />;
      case "documentaries":
        return <Film className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-navy-700">Content Library</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Discover curated resources on various social causes. Our library is updated daily with videos, 
              books, articles, and more to help you learn and get inspired.
            </p>
            
            {/* Search */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search by title, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Content Tabs */}
          <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as ContentType)}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="documentaries">Documentaries</TabsTrigger>
                <TabsTrigger value="talks">TED Talks</TabsTrigger>
                <TabsTrigger value="books">Books</TabsTrigger>
                <TabsTrigger value="articles">Articles</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <ContentGrid items={filteredContent} />
            </TabsContent>
            <TabsContent value="videos" className="mt-0">
              <ContentGrid items={filteredContent} />
            </TabsContent>
            <TabsContent value="documentaries" className="mt-0">
              <ContentGrid items={filteredContent} />
            </TabsContent>
            <TabsContent value="talks" className="mt-0">
              <ContentGrid items={filteredContent} />
            </TabsContent>
            <TabsContent value="books" className="mt-0">
              <ContentGrid items={filteredContent} />
            </TabsContent>
            <TabsContent value="articles" className="mt-0">
              <ContentGrid items={filteredContent} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const ContentGrid = ({ items }: { items: ContentItem[] }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No content found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <ContentCard key={item.id} item={item} />
      ))}
    </div>
  );
};

const ContentCard = ({ item }: { item: ContentItem }) => {
  const getContentIcon = (type: ContentType) => {
    switch (type) {
      case "videos":
        return <Video className="h-5 w-5" />;
      case "books":
        return <BookOpen className="h-5 w-5" />;
      case "articles":
        return <FileText className="h-5 w-5" />;
      case "documentaries":
        return <Film className="h-5 w-5" />;
      case "talks":
        return <Video className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <Card className="overflow-hidden card-hover">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="flex items-center gap-1 bg-white/90">
            {getContentIcon(item.type)}
            <span className="capitalize">{item.type === "talks" ? "TED Talk" : item.type.slice(0, -1)}</span>
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{item.title}</CardTitle>
        <CardDescription className="text-xs text-gray-500">
          Added on {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Bookmark className="h-4 w-4" />
          Save
        </Button>
        <Button asChild size="sm" className="bg-teal-400 hover:bg-teal-500">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            View <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentLibrary;
