import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail, Instagram, Menu, X, Home as HomeIcon, Building2, Ticket, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface HeroSlide {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  icon_name: string;
  services: string[];
}

interface ContactInfo {
  type: string;
  value: string;
  label: string;
}

/**
 * Design Philosophy: Elegância Clássica com Modernidade Contida
 * - Tipografia: Playfair Display (títulos) + Lato (corpo)
 * - Cores: Verde Floresta (#4A7C59), Marrom Quente (#8B5A3C), Bege (#D4C5B9)
 * - Layout: Alternância entre assimétrico e simétrico com espaçamento generoso
 * - Elementos: Linhas decorativas, ícones circulares, divisores visuais
 */

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch Hero Slides
        const { data: slidesData } = await supabase
          .from("hero_slides")
          .select("*")
          .order("order_index", { ascending: true });

        if (slidesData) setSlides(slidesData);

        // Fetch Categories and Services
        const { data: categoriesData } = await supabase
          .from("service_categories")
          .select(`
            id,
            name,
            slug,
            icon,
            services (
              name,
              order_index
            )
          `)
          .order("order_index", { ascending: true });

        if (categoriesData) {
          const formattedCategories = categoriesData.map((cat: any) => ({
            id: cat.slug,
            title: cat.name,
            icon_name: cat.icon,
            services: cat.services
              .sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0))
              .map((s: any) => s.name)
          }));
          setCategories(formattedCategories);
        }

        // Fetch Contact Info
        const { data: contactData } = await supabase
          .from("contact_info")
          .select("*");

        if (contactData) setContactInfo(contactData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Home": return <HomeIcon className="w-5 h-5" />;
      case "Building2": return <Building2 className="w-5 h-5" />;
      case "Ticket": return <Ticket className="w-5 h-5" />;
      default: return <HomeIcon className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="container flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 flex items-center justify-center">
              <img src="/logo.png" alt="Studio SF Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-primary hidden sm:inline">Studio SF</span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 items-center">
            <li><a href="#services" className="text-foreground hover:text-primary transition">Serviços</a></li>
            <li><a href="#about" className="text-foreground hover:text-primary transition">Sobre</a></li>
            <li><a href="#contact" className="text-foreground hover:text-primary transition">Contato</a></li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <ul className="container py-4 space-y-3 flex flex-col">
              <li>
                <a
                  href="#services"
                  className="block px-4 py-2 text-foreground hover:bg-primary/10 hover:text-primary rounded transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block px-4 py-2 text-foreground hover:bg-primary/10 hover:text-primary rounded transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block px-4 py-2 text-foreground hover:bg-primary/10 hover:text-primary rounded transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Hero Carousel */}
      <section className="relative h-96 md:h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={slide.image_url}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg md:text-2xl mb-8 font-light">{slide.description}</p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Saiba Mais
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6 text-primary" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-6 h-6 text-primary" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${index === currentSlide ? "bg-white w-8" : "bg-white/50"
                }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Nossos Serviços</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Oferecemos soluções completas em arquitetura e design de interiores para transformar seus espaços
            </p>
          </div>

          <Tabs defaultValue="residenciais" className="w-full">
            <TabsList className="flex flex-wrap justify-center bg-transparent gap-4 mb-12 h-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white px-8 py-3 rounded-full border border-primary text-primary transition-all flex items-center gap-2 font-semibold"
                >
                  {renderIcon(category.icon_name)}
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, idx) => (
                    <Card key={idx} className="hover:shadow-md transition-shadow border-l-4 border-l-primary h-full">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                        <span className="text-lg font-medium text-foreground">{service}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Sobre o Studio SF</h2>
              <div className="w-24 h-1 bg-secondary mb-6" />
              <p className="text-lg text-foreground mb-4 leading-relaxed">
                O Studio SF Arquitetura e Interiores é especializado em criar espaços que combinam elegância, funcionalidade e personalidade. Com uma abordagem centrada no cliente, desenvolvemos projetos que transformam ambientes e refletem a identidade de quem os habita.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                Nossa equipe de profissionais qualificados trabalha com dedicação para garantir que cada projeto seja executado com excelência, respeitando prazos e orçamentos estabelecidos.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 border-l-4 border-primary">
              <h3 className="text-2xl font-bold text-primary mb-6">Profissionais</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-secondary">Stafany Folla</h4>
                  <p className="text-sm text-muted-foreground">CAU A171109-1</p>
                  <p className="text-primary font-semibold">(11) 94445-5513</p>
                </div>
                <div className="border-t border-border pt-6">
                  <h4 className="text-lg font-bold text-secondary">Flavia Aranttes</h4>
                  <p className="text-sm text-muted-foreground">CAU A174516-6</p>
                  <p className="text-primary font-semibold">(11) 99140-0266</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="h-1 bg-gradient-to-r from-secondary via-primary to-secondary" />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Entre em Contato</h2>
            <div className="w-24 h-1 bg-secondary mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Telefone</h3>
              {contactInfo.filter(c => c.type === 'phone').map((c, idx) => (
                <a
                  key={idx}
                  href={`https://wa.me/${c.value}?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline mb-2 block transition"
                >
                  {c.value.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4')}
                </a>
              ))}
            </div>

            <div className="bg-white rounded-lg p-8 text-center border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Email</h3>
              {contactInfo.filter(c => c.type === 'email').map((c, idx) => (
                <a key={idx} href={`mailto:${c.value}`} className="text-primary hover:underline">
                  {c.value}
                </a>
              ))}
            </div>

            <div className="bg-white rounded-lg p-8 text-center border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Instagram className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Redes Sociais</h3>
              <div className="flex justify-center gap-4">
                {contactInfo.filter(c => c.type === 'instagram').map((c, idx) => (
                  <a
                    key={idx}
                    href={`https://instagram.com/${c.value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary transition font-semibold"
                    title="Instagram"
                  >
                    @{c.value}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full p-1">
                  <img src="/logo.png" alt="Studio SF Logo" className="w-full h-full object-contain" />
                </div>
                <h4 className="text-lg font-bold">Studio SF</h4>
              </div>
              <p className="text-white/80">Arquitetura e Interiores com excelência e dedicação</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Serviços</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#services" className="hover:text-white transition">Arquitetura</a></li>
                <li><a href="#services" className="hover:text-white transition">Interiores</a></li>
                <li><a href="#services" className="hover:text-white transition">Consultorias</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contato</h4>
              <p className="text-white/80 mb-2">
                <a href="mailto:arq.studiosf@gmail.com" className="hover:text-white transition">
                  arq.studiosf@gmail.com
                </a>
              </p>
              <p className="text-white/80 mb-3">
                <a
                  href="https://wa.me/5511944455513?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  (11) 94445-5513
                </a>
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://instagram.com/arq.studiosf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <p className="text-center text-white/60">
              © 2026 Studio SF Arquitetura e Interiores. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
