import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LogOut, Plus, Trash2, Save, LayoutDashboard, Settings, Phone, Mail, Instagram, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [, setLocation] = useLocation();

    // Data states
    const [slides, setSlides] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [contactInfo, setContactInfo] = useState<any[]>([]);
    const [saving, setSaving] = useState<string | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                setLocation("/login");
            } else {
                setSession(session);
                fetchData();
            }
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) setLocation("/login");
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, [setLocation]);

    const fetchData = async () => {
        try {
            const { data: s } = await supabase.from("hero_slides").select("*").order("order_index");
            const { data: c } = await supabase.from("service_categories").select("*, services(*)").order("order_index");
            const { data: ci } = await supabase.from("contact_info").select("*");

            if (s) setSlides(s);
            if (c) setCategories(c);
            if (ci) setContactInfo(ci);
        } catch (e) {
            toast.error("Erro ao carregar dados");
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setLocation("/login");
    };

    const updateSlide = async (id: number, updates: any) => {
        setSaving(`slide-${id}`);
        const { error } = await supabase.from("hero_slides").update(updates).eq("id", id);
        if (!error) toast.success("Slide atualizado");
        else toast.error("Erro ao atualizar slide");
        setSaving(null);
    };

    const updateContact = async (id: number, value: string) => {
        setSaving(`contact-${id}`);
        const { error } = await supabase.from("contact_info").update({ value }).eq("id", id);
        if (!error) toast.success("Contato atualizado");
        else toast.error("Erro ao atualizar contato");
        setSaving(null);
    };

    const addService = async (categoryId: number, name: string) => {
        if (!name) return;
        const { error } = await supabase.from("services").insert({ category_id: categoryId, name });
        if (!error) {
            toast.success("Serviço adicionado");
            fetchData();
        } else toast.error("Erro ao adicionar serviço");
    };

    const deleteService = async (id: number) => {
        const { error } = await supabase.from("services").delete().eq("id", id);
        if (!error) {
            toast.success("Serviço removido");
            fetchData();
        } else toast.error("Erro ao remover serviço");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-primary">
                <Loader2 className="w-12 h-12 animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Admin Header */}
            <header className="bg-primary text-white sticky top-0 z-50">
                <div className="container py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <LayoutDashboard className="w-6 h-6" />
                        <h1 className="text-xl font-bold">Painel Studio SF</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm opacity-80 hidden md:inline">{session.user.email}</span>
                        <Button variant="outline" size="sm" onClick={handleLogout} className="text-white border-white/30 hover:bg-white/10 hover:text-white">
                            <LogOut className="w-4 h-4 mr-2" /> Sair
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container py-8 max-w-6xl">
                <Tabs defaultValue="services" className="space-y-6">
                    <TabsList className="bg-white border border-border p-1">
                        <TabsTrigger value="services">Serviços</TabsTrigger>
                        <TabsTrigger value="hero">Carrossel (Topo)</TabsTrigger>
                        <TabsTrigger value="contact">Contatos</TabsTrigger>
                    </TabsList>

                    {/* Services Content */}
                    <TabsContent value="services" className="space-y-6">
                        <div className="grid gap-6">
                            {categories.map((cat) => (
                                <Card key={cat.id}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-primary">
                                            {cat.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid gap-2">
                                            {cat.services?.sort((a: any, b: any) => a.id - b.id).map((service: any) => (
                                                <div key={service.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg group">
                                                    <span>{service.name}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() => deleteService(service.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Novo serviço..."
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        addService(cat.id, e.currentTarget.value);
                                                        e.currentTarget.value = "";
                                                    }
                                                }}
                                            />
                                            <Button onClick={(e) => {
                                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                                addService(cat.id, input.value);
                                                input.value = "";
                                            }}>
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Hero Content */}
                    <TabsContent value="hero" className="space-y-6">
                        <div className="grid gap-6">
                            {slides.map((slide) => (
                                <Card key={slide.id}>
                                    <CardContent className="p-6">
                                        <div className="grid md:grid-cols-[200px_1fr] gap-6">
                                            <div className="aspect-video bg-muted rounded overflow-hidden">
                                                <img src={slide.image_url} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="space-y-4">
                                                <div className="grid gap-2">
                                                    <label className="text-sm font-medium">Título</label>
                                                    <Input
                                                        value={slide.title}
                                                        onChange={(e) => setSlides(prev => prev.map(s => s.id === slide.id ? { ...s, title: e.target.value } : s))}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <label className="text-sm font-medium">Descrição</label>
                                                    <Input
                                                        value={slide.description}
                                                        onChange={(e) => setSlides(prev => prev.map(s => s.id === slide.id ? { ...s, description: e.target.value } : s))}
                                                    />
                                                </div>
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        onClick={() => updateSlide(slide.id, { title: slide.title, description: slide.description })}
                                                        disabled={saving === `slide-${slide.id}`}
                                                    >
                                                        {saving === `slide-${slide.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                                        Salvar Alterações
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Contact Content */}
                    <TabsContent value="contact" className="space-y-6">
                        <Card>
                            <CardContent className="p-6 space-y-4">
                                {contactInfo.map((info) => (
                                    <div key={info.id} className="grid md:grid-cols-[150px_1fr_100px] items-center gap-4">
                                        <span className="capitalize font-medium flex items-center gap-2">
                                            {info.type === 'phone' && <Phone className="w-4 h-4" />}
                                            {info.type === 'email' && <Mail className="w-4 h-4" />}
                                            {info.type === 'instagram' && <Instagram className="w-4 h-4" />}
                                            {info.type}
                                        </span>
                                        <Input
                                            value={info.value}
                                            onChange={(e) => setContactInfo(prev => prev.map(c => c.id === info.id ? { ...c, value: e.target.value } : c))}
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateContact(info.id, info.value)}
                                            disabled={saving === `contact-${info.id}`}
                                        >
                                            {saving === `contact-${info.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
