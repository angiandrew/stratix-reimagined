import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { ArrowLeft, Save, Eye, EyeOff, CheckCircle2, LayoutDashboard } from "lucide-react";
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

  // Retell Integration state
  const [retellOrgName, setRetellOrgName] = useState("");
  const [retellApiKey, setRetellApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [retellLoading, setRetellLoading] = useState(true);
  const [retellSaving, setRetellSaving] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
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

    const fetchRetellSettings = async () => {
      const { data, error } = await supabase
        .from("app_settings")
        .select("key, value")
        .in("key", ["retell_org_name", "retell_api_key"]);

      if (!error && data) {
        data.forEach((row) => {
          if (row.key === "retell_org_name") setRetellOrgName(row.value);
          if (row.key === "retell_api_key") setRetellApiKey(row.value);
        });
      }
      setRetellLoading(false);
    };

    fetchProfiles();
    fetchRetellSettings();
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

  const upsertSetting = async (key: string, value: string) => {
    // Try update first, then insert if no rows matched
    const { data, error: updateError } = await supabase
      .from("app_settings")
      .update({ value, updated_at: new Date().toISOString() })
      .eq("key", key)
      .select();

    if (updateError) throw updateError;

    if (!data || data.length === 0) {
      const { error: insertError } = await supabase
        .from("app_settings")
        .insert({ key, value });
      if (insertError) throw insertError;
    }
  };

  const handleSaveRetell = async () => {
    setRetellSaving(true);
    try {
      await upsertSetting("retell_org_name", retellOrgName);
      await upsertSetting("retell_api_key", retellApiKey);
      toast.success("Retell integration saved!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Retell settings");
    }
    setRetellSaving(false);
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
          <p className="text-sm text-muted-foreground">Manage users, integrations, and settings</p>
        </div>

        {/* Retell Integration */}
        <Card className="border-border/10 bg-card/60">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-bold text-lg">R</div>
              <div>
                <CardTitle className="text-base">Retell Integration</CardTitle>
                <CardDescription>Configure your Retell API credentials</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {retellLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="retellOrg">Organization Name</Label>
                  <Input
                    id="retellOrg"
                    value={retellOrgName}
                    onChange={(e) => setRetellOrgName(e.target.value)}
                    placeholder="Enter organization name"
                    className="bg-secondary/50 border-border/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retellKey">API Key</Label>
                  <div className="relative">
                    <Input
                      id="retellKey"
                      type={showApiKey ? "text" : "password"}
                      value={retellApiKey}
                      onChange={(e) => setRetellApiKey(e.target.value)}
                      placeholder="Enter API key"
                      className="bg-secondary/50 border-border/30 font-mono text-sm pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Find your API key in Retell → Keys in the sidebar.
                  </p>
                </div>
                <Button onClick={handleSaveRetell} disabled={retellSaving} className="gap-2">
                  {retellSaving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  {retellSaving ? "Saving..." : "Save Integration"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Users Table */}
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
                      <TableHead>Retell Agent ID</TableHead>
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
                            placeholder="agent_xxxxxxxx"
                          />
                        </TableCell>
                        <TableCell className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" onClick={() => handleSaveOrg(profile.id)}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => navigate(`/dashboard?user=${profile.id}`)} title="View dashboard">
                            <LayoutDashboard className="h-4 w-4" />
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
