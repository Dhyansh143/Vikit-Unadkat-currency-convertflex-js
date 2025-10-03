import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users } from "lucide-react";

export const UserStats = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      // Count distinct users who have accessed the app
      const { data, error } = await supabase
        .from('user_access_logs')
        .select('user_id', { count: 'exact', head: true });

      if (error) throw error;

      // Get unique user count
      const { count } = await supabase
        .from('user_access_logs')
        .select('user_id', { count: 'exact', head: false });

      setTotalUsers(count || 0);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
      <Users className="h-4 w-4" />
      <span>{totalUsers} users have accessed this app</span>
    </div>
  );
};
