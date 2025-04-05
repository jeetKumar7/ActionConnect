import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Users, Compass, ArrowRight } from "lucide-react";

type Cause = "climate" | "education" | "healthcare" | "poverty" | "equality" | "conservation" | "peace" | "hunger";

type MapUser = {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  interests: Cause[];
  bio: string;
  avatar: string;
};

const InteractiveMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCause, setSelectedCause] = useState<string>("");
  const [distance, setDistance] = useState([100]);
  const [mapUsers, setMapUsers] = useState<MapUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<MapUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<MapUser | null>(null);

  // Mock data for users
  useEffect(() => {
    // In a real app, this would be an API call to get users
    const mockUsers: MapUser[] = [
      {
        id: "1",
        name: "Alex Johnson",
        location: "New York, USA",
        lat: 40.7128,
        lng: -74.006,
        interests: ["climate", "conservation", "equality"],
        bio: "Environmental activist working on urban sustainability projects in NYC.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: "2",
        name: "Sophia Chen",
        location: "London, UK",
        lat: 51.5074,
        lng: -0.1278,
        interests: ["education", "equality", "poverty"],
        bio: "Education equity advocate focusing on access to quality education for underprivileged communities.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        id: "3",
        name: "Miguel Herrera",
        location: "Mexico City, Mexico",
        lat: 19.4326,
        lng: -99.1332,
        interests: ["healthcare", "hunger", "poverty"],
        bio: "Doctor working with NGOs to provide healthcare services in underserved areas.",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
        id: "4",
        name: "Aisha Patel",
        location: "Mumbai, India",
        lat: 19.076,
        lng: 72.8777,
        interests: ["education", "equality", "peace"],
        bio: "Community organizer focused on women's empowerment through education and entrepreneurship.",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      },
      {
        id: "5",
        name: "David Kim",
        location: "Seoul, South Korea",
        lat: 37.5665,
        lng: 126.978,
        interests: ["climate", "conservation", "hunger"],
        bio: "Sustainable food systems researcher developing solutions for urban food security.",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      {
        id: "6",
        name: "Fatima Ndiaye",
        location: "Dakar, Senegal",
        lat: 14.7167,
        lng: -17.4677,
        interests: ["education", "healthcare", "equality"],
        bio: "Working on improving access to healthcare and education for girls in rural communities.",
        avatar: "https://randomuser.me/api/portraits/women/54.jpg",
      },
      {
        id: "7",
        name: "James Wilson",
        location: "Sydney, Australia",
        lat: -33.8688,
        lng: 151.2093,
        interests: ["conservation", "climate", "peace"],
        bio: "Marine biologist working on coral reef conservation and climate resilience projects.",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
      },
      {
        id: "8",
        name: "Gabriela Santos",
        location: "Rio de Janeiro, Brazil",
        lat: -22.9068,
        lng: -43.1729,
        interests: ["poverty", "equality", "peace"],
        bio: "Social entrepreneur developing programs to reduce poverty in favelas through community-led initiatives.",
        avatar: "https://randomuser.me/api/portraits/women/30.jpg",
      },
    ];

    setMapUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  // Filter users based on search query, cause, and distance
  useEffect(() => {
    let filtered = [...mapUsers];

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.bio.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCause) {
      filtered = filtered.filter((user) => user.interests.includes(selectedCause as Cause));
    }

    // In a real app, distance filtering would use geolocation
    // This is just a simulation for the demo
    if (distance[0] < 100) {
      // Simulate fewer results for smaller distances
      const cutoff = Math.floor((filtered.length * distance[0]) / 100);
      filtered = filtered.slice(0, Math.max(1, cutoff));
    }

    setFilteredUsers(filtered);
  }, [searchQuery, selectedCause, distance, mapUsers]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gradient-to-b from-navy-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-navy-700">Interactive Map</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with like-minded individuals around the world who share your passion for social causes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Find Connections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        className="pl-10"
                        placeholder="Name, location, or bio..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Cause Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Cause</label>
                    <Select value={selectedCause} onValueChange={setSelectedCause}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a cause" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Causes</SelectItem>
                        <SelectItem value="climate">Climate Action</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="poverty">Poverty Reduction</SelectItem>
                        <SelectItem value="equality">Equality & Rights</SelectItem>
                        <SelectItem value="conservation">Conservation</SelectItem>
                        <SelectItem value="peace">Peace & Justice</SelectItem>
                        <SelectItem value="hunger">Hunger & Food Security</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Distance Slider */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Distance</label>
                      <span className="text-sm text-gray-500">{distance[0]} miles</span>
                    </div>
                    <Slider defaultValue={[100]} max={100} step={5} value={distance} onValueChange={setDistance} />
                  </div>

                  {/* Results Count */}
                  <div className="text-center pt-4 border-t">
                    <p className="text-sm text-gray-500">
                      Showing {filteredUsers.length} of {mapUsers.length} connections
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* User List on Mobile/Tablet */}
              <div className="mt-8 lg:hidden">
                <h2 className="text-xl font-semibold mb-4 text-navy-700">People Near You</h2>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      onClick={() => setSelectedUser(user)}
                      isSelected={selectedUser?.id === user.id}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Map and User Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Map Placeholder - In a real app, integrate with a mapping library */}
              <div className="rounded-lg overflow-hidden shadow-md bg-teal-50 border border-teal-100 h-96 relative">
                <div className="absolute inset-0 flex items-center justify-center flex-col text-navy-700">
                  <Compass className="h-16 w-16 mb-4 text-teal-400 animate-pulse-slow" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-500 max-w-md text-center mt-2">
                    This is a placeholder for the interactive map. In a real application, this would be an actual map
                    showing user locations.
                  </p>
                </div>

                {/* Simulated map markers */}
                {filteredUsers.map((user, index) => (
                  <div
                    key={user.id}
                    className={`absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                      selectedUser?.id === user.id ? "z-10 scale-125" : ""
                    }`}
                    style={{
                      // Pseudo-random positions for the demo
                      left: `${20 + ((index * 67) % 80)}%`,
                      top: `${15 + ((index * 53) % 70)}%`,
                    }}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="relative">
                      <div
                        className={`absolute -inset-1 rounded-full ${
                          selectedUser?.id === user.id ? "bg-teal-400 animate-pulse-slow" : "bg-transparent"
                        }`}
                      ></div>
                      <div className="relative bg-white rounded-full p-1 border-2 border-teal-400">
                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected User Details or User List */}
              {selectedUser ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row">
                      <div className="mb-4 sm:mb-0 sm:mr-6">
                        <img src={selectedUser.avatar} alt={selectedUser.name} className="w-20 h-20 rounded-full" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-navy-700">{selectedUser.name}</h3>
                        <div className="flex items-center text-gray-500 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {selectedUser.location}
                        </div>
                        <p className="text-gray-600 mb-4">{selectedUser.bio}</p>
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Passionate about:</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedUser.interests.map((interest) => (
                              <Badge key={interest} variant="secondary" className="bg-teal-50 text-teal-700">
                                {interest
                                  .split(" ")
                                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                  .join(" ")}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <Button className="bg-teal-400 hover:bg-teal-500">Connect</Button>
                          <Button variant="outline">Message</Button>
                          <Button variant="ghost" className="ml-auto" onClick={() => setSelectedUser(null)}>
                            Close
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="hidden lg:block">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-navy-700">People Near You</h2>
                    <Button variant="ghost" size="sm">
                      View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredUsers.slice(0, 4).map((user) => (
                      <UserCard key={user.id} user={user} onClick={() => setSelectedUser(user)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const UserCard = ({
  user,
  onClick,
  isSelected = false,
}: {
  user: MapUser;
  onClick: () => void;
  isSelected?: boolean;
}) => {
  return (
    <Card
      className={`cursor-pointer transition-all ${
        isSelected ? "border-teal-400 shadow-md" : "hover:border-teal-200 hover:shadow-md"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center">
          <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h3 className="font-medium text-navy-700">{user.name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-3 w-3 mr-1" />
              {user.location}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-sm text-gray-600 line-clamp-2">{user.bio}</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {user.interests.slice(0, 2).map((interest) => (
            <Badge key={interest} variant="outline" className="text-xs bg-teal-50 border-teal-100">
              {interest.charAt(0).toUpperCase() + interest.slice(1)}
            </Badge>
          ))}
          {user.interests.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{user.interests.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;
