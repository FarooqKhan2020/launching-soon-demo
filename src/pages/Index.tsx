// import { useState, useEffect } from "react";
// import { Mail } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";

// const Index = () => {
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [totalSignups, setTotalSignups] = useState<number>(0);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const { data, error } = await supabase.functions.invoke('stats');
//       if (error) throw error;
//       setTotalSignups(data.total_signups);
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!email) {
//       toast({
//         title: "Error",
//         description: "Please enter your email address",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const { data, error } = await supabase.functions.invoke('signup', {
//         body: { email },
//       });

//       if (error) throw error;

//       if (data.duplicate) {
//         toast({
//           title: "Already Subscribed!",
//           description: "This email is already on our list.",
//         });
//       } else if (data.success) {
//         setIsSuccess(true);
//         setEmail("");
//         toast({
//           title: "Success!",
//           description: "Thank you for subscribing! We'll notify you when we launch.",
//         });
//         fetchStats();
//       }
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message || "Something went wrong. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <main className="flex-grow">
//         <section className="relative py-20 md:py-32 min-h-[calc(100vh-80px)]">
//           <div 
//             className="absolute inset-0 bg-cover bg-center" 
//             style={{
//               backgroundImage: "linear-gradient(rgba(15, 32, 35, 0.7), rgba(15, 32, 35, 0.9)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9WoP6Ttr6dF8AJx64pJpC0rJq6U1PBXxDdIBilJiR2O6zVcLP0bIaEu1-4vCW0yVaghYBgF0WMOM3vJUjfux-EQ4pY2sPnJRmJwX2EAAFPwXB_Hlt75i77Xyp8JeudYfEMUlcGcGc7vbMxUOXtIdlYjSSzmjm_qXZmxn8SW8ALho_BbGDmURql6fol9vQ3zB2N473qsXU_fmS_rBTmW0-S6osoKjKIgpX85-sWJRlk5QqBxhuTY0dMdEpcwL2thNrmNiL_BWSJ7a7')"
//             }}
//           />
//           <div className="absolute inset-0 bg-background/80" />
          
//           <div className="relative container mx-auto px-4 text-center">
//             <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4">
//               Launching Soon
//             </h1>
//             <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
//               Stay tuned for our exciting new product. We're working hard to bring you something amazing.
//             </p>

//             {!isSuccess ? (
//               <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
//                 <div className="relative flex-grow">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
//                   <Input
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 h-12 bg-background/50 backdrop-blur-sm"
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <Button
//                   type="submit"
//                   disabled={isLoading}
//                   className="bg-primary text-primary-foreground font-bold py-3 px-6 h-12 hover:bg-primary/90 shadow-lg"
//                 >
//                   {isLoading ? "Submitting..." : "Notify Me"}
//                 </Button>
//               </form>
//             ) : (
//               <div className="max-w-md mx-auto p-4 bg-success/10 border border-success/20 rounded-lg">
//                 <p className="text-success font-semibold">
//                   Thank you! We'll notify you when we launch.
//                 </p>
//               </div>
//             )}

//             <p className="mt-4 text-sm text-muted-foreground">
//               We'll send you an email when we launch.
//             </p>

//             {totalSignups > 0 && (
//               <div className="mt-8 inline-block px-6 py-3 bg-primary/10 border border-primary/20 rounded-lg">
//                 <p className="text-sm text-muted-foreground">
//                   Join <span className="font-bold text-primary text-lg">{totalSignups}</span> others waiting for launch
//                 </p>
//               </div>
//             )}
//           </div>
//         </section>
//       </main>

//       <footer className="bg-background border-t border-border py-6">
//         <div className="container mx-auto px-4 text-center text-muted-foreground">
//           <p>© 2025 Launching Soon. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Index;











import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [totalSignups, setTotalSignups] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("stats");
      if (error) throw error;
      setTotalSignups(data.total_signups);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("signup", {
        body: { email },
      });

      if (error) throw error;

      if (data.duplicate) {
        toast({
          title: "Already Subscribed!",
          description: "This email is already on our list.",
        });
      } else if (data.success) {
        setIsSuccess(true);
        setEmail("");
        toast({
          title: "Success!",
          description: "Thank you for subscribing! We'll notify you when we launch.",
        });
        fetchStats();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-display bg-[#f5f8f8] dark:bg-[#0f2023] text-slate-800 dark:text-slate-200">
      <main className="flex-grow">
        <section className="relative py-20 md:py-32 min-h-[calc(100vh-80px)] overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15, 32, 35, 0.7), rgba(15, 32, 35, 0.9)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9WoP6Ttr6dF8AJx64pJpC0rJq6U1PBXxDdIBilJiR2O6zVcLP0bIaEu1-4vCW0yVaghYBgF0WMOM3vJUjfux-EQ4pY2sPnJRmJwX2EAAFPwXB_Hlt75i77Xyp8JeudYfEMUlcGcGc7vbMxUOXtIdlYjSSzmjm_qXZmxn8SW8ALho_BbGDmURql6fol9vQ3zB2N473qsXU_fmS_rBTmW0-S6osoKjKIgpX85-sWJRlk5QqBxhuTY0dMdEpcwL2thNrmNiL_BWSJ7a7')",
            }}
          />
          <div className="absolute inset-0 bg-[#0f2023]/80" />

          {/* Main content */}
          <div className="relative container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-black mb-4 text-[#06dcf9] drop-shadow-[0_0_10px_rgba(6,220,249,0.6)]">
              Launching Soon
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              Stay tuned for our exciting new product. We're working hard to bring you something amazing.
            </p>

            {!isSuccess ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-lg"
              >
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#06dcf9] h-5 w-5" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 h-12 rounded-lg bg-[#0f2023]/50 border border-[#06dcf9]/40 text-white placeholder:text-slate-400 focus:ring-[#06dcf9] focus:border-[#06dcf9] transition duration-300"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#06dcf9] text-[#0f2023] font-bold py-3 px-6 h-12 rounded-lg hover:bg-[#06dcf9]/90 shadow-[0_0_15px_rgba(6,220,249,0.6)] transition duration-300"
                >
                  {isLoading ? "Submitting..." : "Notify Me"}
                </Button>
              </form>
            ) : (
              <div className="max-w-md mx-auto p-5 bg-emerald-500/10 border border-emerald-400/20 rounded-xl shadow-md">
                <p className="text-emerald-400 font-semibold">
                  Thank you! We'll notify you when we launch.
                </p>
              </div>
            )}

            <p className="mt-5 text-sm text-slate-400">
              We'll send you an email when we launch.
            </p>

            {totalSignups > 0 && (
              <div className="mt-8 inline-block px-6 py-3 bg-[#06dcf9]/10 border border-[#06dcf9]/30 rounded-lg shadow-[0_0_10px_rgba(6,220,249,0.3)]">
                <p className="text-sm text-slate-300">
                  Join{" "}
                  <span className="font-bold text-[#06dcf9] text-lg">
                    {totalSignups}
                  </span>{" "}
                  others waiting for launch
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-[#0f2023] border-t border-[#06dcf9]/20 py-6 text-center text-slate-400">
        <p>© 2025 Stitch Design. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
