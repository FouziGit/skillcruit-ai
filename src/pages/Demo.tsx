import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, FileText, Clock, TrendingUp, Star, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

const candidates = [
  { name: "Marie Laurent", poste: "Développeuse Full-Stack", score: 94, match: "Excellent", skills: ["React", "Node.js", "TypeScript"], experience: "6 ans" },
  { name: "Thomas Moreau", poste: "Développeur Backend", score: 87, match: "Très bon", skills: ["Python", "Django", "PostgreSQL"], experience: "4 ans" },
  { name: "Sophie Bernard", poste: "Data Scientist", score: 82, match: "Bon", skills: ["Python", "ML", "TensorFlow"], experience: "3 ans" },
  { name: "Lucas Martin", poste: "DevOps Engineer", score: 78, match: "Bon", skills: ["Docker", "Kubernetes", "AWS"], experience: "5 ans" },
  { name: "Émilie Petit", poste: "Product Manager", score: 71, match: "Moyen", skills: ["Agile", "Roadmap", "Data Analysis"], experience: "7 ans" },
];

const barData = [
  { name: "Lun", cvAnalyses: 45 },
  { name: "Mar", cvAnalyses: 62 },
  { name: "Mer", cvAnalyses: 38 },
  { name: "Jeu", cvAnalyses: 78 },
  { name: "Ven", cvAnalyses: 56 },
];

const pieData = [
  { name: "Excellent", value: 15, color: "#2563eb" },
  { name: "Très bon", value: 25, color: "#3b82f6" },
  { name: "Bon", value: 35, color: "#93c5fd" },
  { name: "À revoir", value: 25, color: "#e2e8f0" },
];

const stats = [
  { icon: FileText, label: "CV analysés", value: "1,247", trend: "+23%" },
  { icon: Users, label: "Candidats qualifiés", value: "312", trend: "+18%" },
  { icon: Clock, label: "Temps moyen", value: "28s", trend: "-45%" },
  { icon: TrendingUp, label: "Taux de matching", value: "89%", trend: "+12%" },
];

const Demo = () => {
  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Démo interactive Skillcruit - Découvrez la présélection en action"
        description="Explorez notre dashboard interactif et découvrez comment Skillcruit analyse et classe les CV en quelques secondes."
        canonical="https://skillcruit.fr/demo"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Démo interactive Skillcruit",
          "description": "Dashboard interactif de présélection de CV avec scoring NLP en temps réel.",
          "url": "https://skillcruit.fr/demo",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://skillcruit.fr" },
              { "@type": "ListItem", "position": 2, "name": "Démo", "item": "https://skillcruit.fr/demo" },
            ],
          },
        }}
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Dashboard <span className="text-primary">Skillcruit</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Explorez notre interface avec des données de démonstration. Découvrez comment Skillcruit analyse et classe vos candidats.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-sm text-amber-700">
              Données fictives à titre de démonstration
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-8">
        <div className="container px-6">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-6 rounded-xl bg-white border border-border/60 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      {stat.trend}
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Charts */}
      <section className="pb-8">
        <div className="container px-6">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Bar chart */}
            <AnimatedSection>
              <div className="p-6 rounded-xl bg-white border border-border/60 shadow-sm">
                <h3 className="font-semibold mb-4">CV analysés cette semaine</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="cvAnalyses" fill="#2563eb" radius={[6, 6, 0, 0]} name="CV analysés" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </AnimatedSection>

            {/* Pie chart */}
            <AnimatedSection delay={0.1}>
              <div className="p-6 rounded-xl bg-white border border-border/60 shadow-sm">
                <h3 className="font-semibold mb-4">Répartition des scores</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={50}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  {pieData.map(item => (
                    <div key={item.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Candidates table */}
      <section className="pb-16">
        <div className="container px-6">
          <AnimatedSection>
            <div className="max-w-5xl mx-auto p-6 rounded-xl bg-white border border-border/60 shadow-sm">
              <h3 className="font-semibold mb-6">Top candidats - Poste : Développeur Senior</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Candidat</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Poste actuel</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Score</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Matching</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Compétences clés</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Exp.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((candidate, i) => (
                      <motion.tr
                        key={i}
                        className="border-b border-border/50 hover:bg-slate-50 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <td className="py-4 px-4 font-medium">{candidate.name}</td>
                        <td className="py-4 px-4 text-muted-foreground">{candidate.poste}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{ width: `${candidate.score}%` }}
                              />
                            </div>
                            <span className="font-semibold text-primary">{candidate.score}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            candidate.score >= 90 ? "bg-emerald-50 text-emerald-700" :
                            candidate.score >= 80 ? "bg-blue-50 text-blue-700" :
                            candidate.score >= 70 ? "bg-amber-50 text-amber-700" :
                            "bg-slate-100 text-slate-600"
                          }`}>
                            {candidate.match}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.map(skill => (
                              <span key={skill} className="px-2 py-0.5 rounded bg-slate-100 text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">{candidate.experience}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container px-6">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto p-10 rounded-2xl bg-primary text-white text-center">
              <Star className="w-10 h-10 mx-auto mb-4 opacity-80" />
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Convaincu ?</h2>
              <p className="text-blue-100 mb-6 max-w-lg mx-auto">
                Essayez Skillcruit avec vos propres CV. 14 jours gratuits, sans carte bancaire.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="group text-primary font-semibold"
                onClick={scrollToContact}
              >
                Demander une démo
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Demo;
