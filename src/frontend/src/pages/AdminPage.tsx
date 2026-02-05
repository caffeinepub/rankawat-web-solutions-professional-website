import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, LogOut, Trash2, Users, MessageSquare, Phone, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { useGetAllContactSubmissions, useGetAllServiceInquiries, useDeleteContactSubmission, useDeleteServiceInquiry, useClearAllSubmissions, useClearAllInquiries, useGetContactSubmissionsCount, useGetServiceInquiriesCount } from '../hooks/useQueries';

const ADMIN_USERNAME = 'Ajay_09';
const ADMIN_PASSWORD = 'ajay@23';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const adminSession = sessionStorage.getItem('adminSession');
    if (adminSession === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminSession', 'authenticated');
        toast.success('Login successful! / लॉगिन सफल!');
      } else {
        toast.error('Invalid credentials! / गलत क्रेडेंशियल्स!');
      }
      setIsLoggingIn(false);
    }, 500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminSession');
    setUsername('');
    setPassword('');
    toast.success('Logged out successfully! / लॉगआउट सफल!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-brand-blue/20 to-navy flex items-center justify-center px-4 py-20">
        <Card className="w-full max-w-md bg-navy/80 backdrop-blur-md border-brand-blue/30">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">
              Admin Login / एडमिन लॉगिन
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Enter your credentials to access the admin panel
              <br />
              एडमिन पैनल एक्सेस करने के लिए क्रेडेंशियल्स दर्ज करें
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">
                  Username / यूज़रनेम
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-navy/50 border-brand-blue/30 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password / पासवर्ड
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-navy/50 border-brand-blue/30 text-white placeholder:text-gray-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login / लॉगिन'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { data: submissions = [], isLoading: submissionsLoading, refetch: refetchSubmissions } = useGetAllContactSubmissions();
  const { data: inquiries = [], isLoading: inquiriesLoading, refetch: refetchInquiries } = useGetAllServiceInquiries();
  const { data: submissionsCount = 0n } = useGetContactSubmissionsCount();
  const { data: inquiriesCount = 0n } = useGetServiceInquiriesCount();
  
  const deleteSubmission = useDeleteContactSubmission();
  const deleteInquiry = useDeleteServiceInquiry();
  const clearSubmissions = useClearAllSubmissions();
  const clearInquiries = useClearAllInquiries();

  const handleDeleteSubmission = async (principal: string, timestamp: bigint) => {
    try {
      await deleteSubmission.mutateAsync({ principal, timestamp });
      toast.success('Submission deleted! / सबमिशन डिलीट हो गया!');
      refetchSubmissions();
    } catch (error) {
      toast.error('Failed to delete submission / सबमिशन डिलीट नहीं हो सका');
    }
  };

  const handleDeleteInquiry = async (principal: string, timestamp: bigint) => {
    try {
      await deleteInquiry.mutateAsync({ principal, timestamp });
      toast.success('Inquiry deleted! / इंक्वायरी डिलीट हो गई!');
      refetchInquiries();
    } catch (error) {
      toast.error('Failed to delete inquiry / इंक्वायरी डिलीट नहीं हो सकी');
    }
  };

  const handleClearAllSubmissions = async () => {
    try {
      await clearSubmissions.mutateAsync();
      toast.success('All submissions cleared! / सभी सबमिशन क्लियर हो गए!');
      refetchSubmissions();
    } catch (error) {
      toast.error('Failed to clear submissions / सबमिशन क्लियर नहीं हो सके');
    }
  };

  const handleClearAllInquiries = async () => {
    try {
      await clearInquiries.mutateAsync();
      toast.success('All inquiries cleared! / सभी इंक्वायरी क्लियर हो गईं!');
      refetchInquiries();
    } catch (error) {
      toast.error('Failed to clear inquiries / इंक्वायरी क्लियर नहीं हो सकीं');
    }
  };

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp)).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const totalSubmissions = submissions.reduce((acc, [_, subs]) => acc + subs.length, 0);
  const totalInquiries = inquiries.reduce((acc, [_, inqs]) => acc + inqs.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-brand-blue/20 to-navy py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Admin Dashboard / एडमिन डैशबोर्ड
            </h1>
            <p className="text-gray-400">
              Manage contact submissions and service inquiries
              <br className="md:hidden" />
              संपर्क सबमिशन और सेवा इंक्वायरी प्रबंधित करें
            </p>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout / लॉगआउट
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-navy/80 backdrop-blur-md border-brand-blue/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Total Contact Submissions / कुल संपर्क सबमिशन
              </CardTitle>
              <Users className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-orange">{totalSubmissions}</div>
              <p className="text-xs text-gray-400 mt-1">
                From {Number(submissionsCount)} users / {Number(submissionsCount)} यूज़र्स से
              </p>
            </CardContent>
          </Card>

          <Card className="bg-navy/80 backdrop-blur-md border-brand-blue/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Total Service Inquiries / कुल सेवा इंक्वायरी
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-orange">{totalInquiries}</div>
              <p className="text-xs text-gray-400 mt-1">
                From {Number(inquiriesCount)} users / {Number(inquiriesCount)} यूज़र्स से
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList className="bg-navy/80 border border-brand-blue/30">
            <TabsTrigger value="submissions" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
              Contact Submissions / संपर्क सबमिशन
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
              Service Inquiries / सेवा इंक्वायरी
            </TabsTrigger>
          </TabsList>

          {/* Contact Submissions Tab */}
          <TabsContent value="submissions" className="space-y-4">
            <Card className="bg-navy/80 backdrop-blur-md border-brand-blue/30">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-white">Contact Submissions / संपर्क सबमिशन</CardTitle>
                    <CardDescription className="text-gray-400">
                      View and manage all contact form submissions
                    </CardDescription>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={totalSubmissions === 0 || clearSubmissions.isPending}
                      >
                        {clearSubmissions.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="mr-2 h-4 w-4" />
                        )}
                        Clear All / सभी क्लियर करें
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-navy border-brand-blue/30">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Are you sure? / क्या आप सुनिश्चित हैं?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                          This will permanently delete all contact submissions. This action cannot be undone.
                          <br />
                          यह सभी संपर्क सबमिशन को स्थायी रूप से डिलीट कर देगा। इस क्रिया को पूर्ववत नहीं किया जा सकता।
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-navy/50 text-white border-brand-blue/30">Cancel / रद्द करें</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleClearAllSubmissions}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Delete All / सभी डिलीट करें
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              <CardContent>
                {submissionsLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-brand-orange" />
                  </div>
                ) : totalSubmissions === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    No submissions yet / अभी तक कोई सबमिशन नहीं
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-brand-blue/30 hover:bg-transparent">
                          <TableHead className="text-white">Name / नाम</TableHead>
                          <TableHead className="text-white">Phone / फोन</TableHead>
                          <TableHead className="text-white">Message / संदेश</TableHead>
                          <TableHead className="text-white">Date / तारीख</TableHead>
                          <TableHead className="text-white">User ID</TableHead>
                          <TableHead className="text-white text-right">Actions / कार्य</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {submissions.map(([principal, subs]) =>
                          subs.map((sub) => (
                            <TableRow key={`${principal.toString()}-${sub.timestamp}`} className="border-brand-blue/30">
                              <TableCell className="text-white font-medium">{sub.name}</TableCell>
                              <TableCell className="text-gray-300">
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-brand-orange" />
                                  {sub.phone}
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-300 max-w-xs truncate">{sub.message}</TableCell>
                              <TableCell className="text-gray-300">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-brand-orange" />
                                  {formatDate(sub.timestamp)}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="border-brand-blue/30 text-gray-400 font-mono text-xs">
                                  {principal.toString().slice(0, 8)}...
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="bg-navy border-brand-blue/30">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="text-white">Delete submission? / सबमिशन डिलीट करें?</AlertDialogTitle>
                                      <AlertDialogDescription className="text-gray-400">
                                        This will permanently delete this submission.
                                        <br />
                                        यह इस सबमिशन को स्थायी रूप से डिलीट कर देगा।
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="bg-navy/50 text-white border-brand-blue/30">Cancel / रद्द करें</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteSubmission(principal.toString(), sub.timestamp)}
                                        className="bg-destructive hover:bg-destructive/90"
                                      >
                                        Delete / डिलीट करें
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Inquiries Tab */}
          <TabsContent value="inquiries" className="space-y-4">
            <Card className="bg-navy/80 backdrop-blur-md border-brand-blue/30">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-white">Service Inquiries / सेवा इंक्वायरी</CardTitle>
                    <CardDescription className="text-gray-400">
                      View and manage all service inquiry submissions
                    </CardDescription>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={totalInquiries === 0 || clearInquiries.isPending}
                      >
                        {clearInquiries.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="mr-2 h-4 w-4" />
                        )}
                        Clear All / सभी क्लियर करें
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-navy border-brand-blue/30">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Are you sure? / क्या आप सुनिश्चित हैं?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                          This will permanently delete all service inquiries. This action cannot be undone.
                          <br />
                          यह सभी सेवा इंक्वायरी को स्थायी रूप से डिलीट कर देगा। इस क्रिया को पूर्ववत नहीं किया जा सकता।
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-navy/50 text-white border-brand-blue/30">Cancel / रद्द करें</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleClearAllInquiries}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Delete All / सभी डिलीट करें
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              <CardContent>
                {inquiriesLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-brand-orange" />
                  </div>
                ) : totalInquiries === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    No inquiries yet / अभी तक कोई इंक्वायरी नहीं
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-brand-blue/30 hover:bg-transparent">
                          <TableHead className="text-white">Name / नाम</TableHead>
                          <TableHead className="text-white">Phone / फोन</TableHead>
                          <TableHead className="text-white">Service / सेवा</TableHead>
                          <TableHead className="text-white">Message / संदेश</TableHead>
                          <TableHead className="text-white">Date / तारीख</TableHead>
                          <TableHead className="text-white">User ID</TableHead>
                          <TableHead className="text-white text-right">Actions / कार्य</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inquiries.map(([principal, inqs]) =>
                          inqs.map((inq) => (
                            <TableRow key={`${principal.toString()}-${inq.timestamp}`} className="border-brand-blue/30">
                              <TableCell className="text-white font-medium">{inq.name}</TableCell>
                              <TableCell className="text-gray-300">
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-brand-orange" />
                                  {inq.phone}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-brand-orange/20 text-brand-orange border-brand-orange/30">
                                  {inq.service}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-gray-300 max-w-xs truncate">{inq.message}</TableCell>
                              <TableCell className="text-gray-300">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-brand-orange" />
                                  {formatDate(inq.timestamp)}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="border-brand-blue/30 text-gray-400 font-mono text-xs">
                                  {principal.toString().slice(0, 8)}...
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="bg-navy border-brand-blue/30">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="text-white">Delete inquiry? / इंक्वायरी डिलीट करें?</AlertDialogTitle>
                                      <AlertDialogDescription className="text-gray-400">
                                        This will permanently delete this inquiry.
                                        <br />
                                        यह इस इंक्वायरी को स्थायी रूप से डिलीट कर देगा।
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="bg-navy/50 text-white border-brand-blue/30">Cancel / रद्द करें</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteInquiry(principal.toString(), inq.timestamp)}
                                        className="bg-destructive hover:bg-destructive/90"
                                      >
                                        Delete / डिलीट करें
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
