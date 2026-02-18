import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import stratixLogo from "@/assets/stratixos-logo.png";

interface ProfileRow {
  id: string;
  email: string | null;
  display_name: string | null;
  org_id: string | null;
}

const Admin = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOrg, setEditingOrg] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchProfiles = async () => {
      // Admin RLS policy lets admins see all profiles through the calls table,
      // but for profiles we need a direct admin policy. Let's use service role via edge function
      // For now, admins can see their own profile + all calls data
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) {
        toast.error("Failed to load users");
        console.error(error);
      } else {
        setProfiles(data || []);
        const orgs: Record<string, string> = {};
        data?.forEach((p) => { orgs[p.id] = p.org_id || ""; });
        setEditingOrg(orgs);
      }
      setLoading(false);
    };
    fetchProfiles();
  }, []);

  const handleSaveOrg = async (profileId: string) => {
    const newOrg = editingOrg[profileId];
    const { error } = await supabase
      .from("profiles")
      .update({ org_id: newOrg || null })
      .eq("id", profileId);

    if (error) {
      toast.error("Failed to update org_id");
    } else {
      toast.success("Org ID updated!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/">
            <img src={stratixLogo} alt="StratixOS" className="h-8" />
          </Link>
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage users and their org assignments</p>
        </div>

        <Card className="border-border/10 bg-card/60">
          <CardHeader>
            <CardTitle className="text-base">Users</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/10">
                      <TableHead>Email</TableHead>
                      <TableHead>Display Name</TableHead>
                      <TableHead>Org ID</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.map((profile) => (
                      <TableRow key={profile.id} className="border-border/10">
                        <TableCell className="text-sm">{profile.email || "—"}</TableCell>
                        <TableCell className="text-sm">{profile.display_name || "—"}</TableCell>
                        <TableCell>
                          <Input
                            value={editingOrg[profile.id] || ""}
                            onChange={(e) => setEditingOrg((prev) => ({ ...prev, [profile.id]: e.target.value }))}
                            className="bg-secondary/50 border-border/30 font-mono text-xs max-w-[280px]"
                            placeholder="Retell agent_id"
                          />
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost" onClick={() => handleSaveOrg(profile.id)}>
                            <Save className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
