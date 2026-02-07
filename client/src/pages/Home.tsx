import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail, Instagram, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Design Philosophy: Elegância Clássica com Modernidade Contida
 * - Tipografia: Playfair Display (títulos) + Lato (corpo)
 * - Cores: Verde Floresta (#4A7C59), Marrom Quente (#8B5A3C), Bege (#D4C5B9)
 * - Layout: Alternância entre assimétrico e simétrico com espaçamento generoso
 * - Elementos: Linhas decorativas, ícones circulares, divisores visuais
 */

const HERO_SLIDES = [
  {
    id: 1,
    title: "Projetos de Arquitetura",
    description: "Criamos espaços que refletem sua personalidade e necessidades",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/WETLG3HaaE62XRvek9vEQh/sandbox/gp75G469f3j64qfnBkr9qX-img-1_1770374871000_na1fn_aGVyby1hcmNoaXRlY3R1cmUtMDE.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvV0VUTEczSGFhRTYyWFJ2ZWs5dkVRaC9zYW5kYm94L2dwNzVHNDY5ZjNqNjRxZm5Ca3I5cVgtaW1nLTFfMTc3MDM3NDg3MTAwMF9uYTFmbl9hR1Z5YnkxaGNtTm9hWFJsWTNSMWNtVXRNREUucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Tuei~4KfuSNENlj-AgN8622R5sz46O8AFWd69n4TMOnDUB2RB7pvgADMhIWqN9Fx5NWZRG327BTvGua52pNuqD7bzEU-iTiFMnieOjO6s3BE~U1LozXHFxsjOGhl12sNAfjSdQoVlxzxYhkwU7-Cis4oUbPLOnZOTMGXk3LLEEysFWoIov5-3rThcPPXZ3Tee~sYUDKHAW-DML71lYhzslmrd18T6NTknuesX9JEqjSWkiNG9bKKBEHHV8EazySKGhPKYMlBs0A1WXFZ0o6Gz~iBqnK9QPu7gdZ2XCcWgYwVSlHXKboKjr5IY8NCRZdjJz4oX8uTwmscOPgWKP3v1g__",
  },
  {
    id: 2,
    title: "Projetos de Interiores",
    description: "Transformamos ambientes com design sofisticado e funcional",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/WETLG3HaaE62XRvek9vEQh/sandbox/gp75G469f3j64qfnBkr9qX-img-2_1770374873000_na1fn_aGVyby1hcmNoaXRlY3R1cmUtMDI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvV0VUTEczSGFhRTYyWFJ2ZWs5dkVRaC9zYW5kYm94L2dwNzVHNDY5ZjNqNjRxZm5Ca3I5cVgtaW1nLTJfMTc3MDM3NDg3MzAwMF9uYTFmbl9hR1Z5YnkxaGNtTm9hWFJsWTNSMWNtVXRNREkucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=IJ9WE9UPdI8X6ZQzrhOAzVLKvLZE6HCodn6bZI1tqNSmgoDisVX-2x2d~M6PwhKkMDwdeL~I8IJpjfgE2KiL3sLBNI~paZcYPgBI~RlDvYNv2B8hxG6DjWv3ZuiQPrSb78ELMp5mXdWUph4kIM1Is7qjKJ~9g8944dralzTLM6BBit8C3TglIjiFrH0HGCSgfl-TDBk3ubUjVpY09D2489qE55qHDe6KaUGUef7CrYD52CoBVi4HOUBLVpjvc1~~nNKPAdvGLO-SGsVEo3Ok15iMUmP4n3uuKLCcLB8MCYXS1E6HLrcVFb6noJB4y7yNWjTAbmbZUiIayMBeBqdMow__",
  },
  {
    id: 3,
    title: "Consultorias Especializadas",
    description: "Orientação profissional para seus projetos arquitetônicos",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/WETLG3HaaE62XRvek9vEQh/sandbox/gp75G469f3j64qfnBkr9qX-img-3_1770374871000_na1fn_aGVyby1hcmNoaXRlY3R1cmUtMDM.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvV0VUTEczSGFhRTYyWFJ2ZWs5dkVRaC9zYW5kYm94L2dwNzVHNDY5ZjNqNjRxZm5Ca3I5cVgtaW1nLTNfMTc3MDM3NDg3MTAwMF9uYTFmbl9hR1Z5YnkxaGNtTm9hWFJsWTNSMWNtVXRNRE0ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=c8WZlcnfm8E3KCDpea7zCbiwvTQd27GkPiN1m7VLRBXaBaRUruWuPIKzkSd5nXabCkzPFGfsmWLxVPTl98SyXHpL3WdomELRT2lkV2t~glVZH16vfOeMdnqtUb4tokIcx~se0mallSOd1HcEwAOj~Hn7Xe3zuawHtrk6xrAKfqBGu2c8H8XTw3c3F5Phkub8Mk80zZcFpjEpew-MXleIajparcJrUV4LweKp7c4zTNfSMtFQ-knJPN1gWdhukCY-Nx1kuzvhGNml~YkP1iCCthJum6WDTQ79zEKe~h8w5YrlUO8xk9FCvGwvE77sx~vRn4vMB2leZcWYf3XV4W0rAA__",
  },
];

const SERVICES = [
  {
    id: 1,
    title: "Projeto de Arquitetura",
    description: "Designs inovadores que combinam estética e funcionalidade",
    icon: "architecture",
  },
  {
    id: 2,
    title: "Projeto de Interiores",
    description: "Ambientes personalizados que refletem seu estilo de vida",
    icon: "interior",
  },
  {
    id: 3,
    title: "Consultorias",
    description: "Orientação especializada para seus projetos",
    icon: "consultation",
  },
  {
    id: 4,
    title: "Emissão de RRT",
    description: "Documentação técnica e regularização profissional",
    icon: "documentation",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

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
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={slide.image}
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
          {HERO_SLIDES.map((_, index) => (
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow border border-border"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-primary rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
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
              <a
                href="https://wa.me/5511944455513?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline mb-2 block transition"
              >
                (11) 94445-5513
              </a>
              <a
                href="https://wa.me/5511991400266?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline block transition"
              >
                (11) 99140-0266
              </a>
            </div>

            <div className="bg-white rounded-lg p-8 text-center border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Email</h3>
              <a href="mailto:arq.studiosf@gmail.com" className="text-primary hover:underline">
                arq.studiosf@gmail.com
              </a>
            </div>

            <div className="bg-white rounded-lg p-8 text-center border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Instagram className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Redes Sociais</h3>
              <div className="flex justify-center gap-4">
                <a
                  href="https://instagram.com/arq.studiosf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary transition font-semibold"
                  title="Instagram"
                >
                  @arq.studiosf
                </a>
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
