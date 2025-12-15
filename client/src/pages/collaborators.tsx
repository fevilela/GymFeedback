import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useStore, ROLES, UNITS } from "@/hooks/use-store";
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  ArrowLeft,
  UserCircle,
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Schema
const collaboratorSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  role: z.string().min(1, "Selecione um cargo"),
  unit: z.string().min(1, "Selecione uma unidade"),
  image: z.string().optional(),
});

type CollaboratorForm = z.infer<typeof collaboratorSchema>;

export default function Collaborators() {
  const {
    collaborators,
    addCollaborator,
    updateCollaborator,
    removeCollaborator,
    units,
    roles,
  } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CollaboratorForm>({
    resolver: zodResolver(collaboratorSchema),
  });

  const currentImage = watch("image");

  const onSubmit = async (data: CollaboratorForm) => {
    try {
      if (editingId) {
        await updateCollaborator(editingId, data);
        toast({
          title: "Colaborador atualizado!",
          description: `Os dados de ${data.name} foram atualizados.`,
        });
      } else {
        await addCollaborator(data);
        toast({
          title: "Colaborador cadastrado!",
          description: `${data.name} foi adicionado à equipe.`,
        });
      }
      setIsOpen(false);
      reset();
      setEditingId(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível salvar os dados.",
      });
    }
  };

  const handleEdit = (collab: any) => {
    setEditingId(collab.id);
    setValue("name", collab.name);
    setValue("role", collab.role);
    setValue("unit", collab.unit);
    setValue("image", collab.image);
    setIsOpen(true);
  };

  const handleNew = () => {
    setEditingId(null);
    reset();
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await removeCollaborator(id);
      toast({
        title: "Colaborador removido",
        description: "O colaborador foi removido da equipe com sucesso.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível remover o colaborador.",
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Resize to max 400px to keep payload small (approx < 50kb)
          const MAX_SIZE = 400;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Compress to JPEG with 0.7 quality
            const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
            setValue("image", dataUrl);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredCollaborators = collaborators.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">
              Gestão de Colaboradores
            </h1>
            <p className="text-muted-foreground mt-1">
              Cadastre e gerencie a equipe de todas as unidades.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Voltar ao Dashboard
              </Button>
            </Link>
            <Dialog
              open={isOpen}
              onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) {
                  setEditingId(null);
                  reset();
                }
              }}
            >
              <DialogTrigger asChild>
                <Button className="gap-2" onClick={handleNew}>
                  <Plus className="w-4 h-4" /> Novo Colaborador
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingId ? "Editar Colaborador" : "Novo Colaborador"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingId
                      ? "Atualize os dados do colaborador."
                      : "Preencha os dados abaixo para adicionar um novo membro à equipe."}
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 py-4"
                >
                  <div className="flex flex-col items-center gap-4 mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border relative group">
                      {currentImage ? (
                        <img
                          src={currentImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <UserCircle className="w-12 h-12" />
                        </div>
                      )}
                      <label
                        htmlFor="image-upload"
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs font-medium"
                      >
                        Alterar Foto
                      </label>
                    </div>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                    >
                      Carregar Foto
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Ex: Maria Souza"
                    />
                    {errors.name && (
                      <span className="text-xs text-destructive">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Cargo</Label>
                    <Select
                      onValueChange={(val) => setValue("role", val)}
                      value={watch("role")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <span className="text-xs text-destructive">
                        {errors.role.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unidade</Label>
                    <Select
                      onValueChange={(val) => setValue("unit", val)}
                      value={watch("unit")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma unidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.unit && (
                      <span className="text-xs text-destructive">
                        {errors.unit.message}
                      </span>
                    )}
                  </div>

                  {/* Image URL optional - for now hidden/auto-generated in store */}

                  <div className="flex justify-end pt-4">
                    <Button type="submit">
                      {editingId ? "Salvar Alterações" : "Cadastrar"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex items-center gap-4 bg-card/50 p-4 rounded-lg border border-border">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar colaborador por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md bg-transparent border-none focus-visible:ring-0 px-0 text-lg"
          />
        </div>

        {/* Table */}
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Equipe Cadastrada</CardTitle>
            <CardDescription>
              Lista completa de colaboradores ativos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-white/10">
                  <TableHead>Colaborador</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Unidade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCollaborators.map((collab) => (
                  <TableRow
                    key={collab.id}
                    className="hover:bg-white/5 border-white/10"
                  >
                    <TableCell className="font-medium flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                        {collab.image ? (
                          <img
                            src={collab.image}
                            alt={collab.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary font-bold">
                            {collab.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      {collab.name}
                    </TableCell>
                    <TableCell>{collab.role}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-white text-xs font-bold">
                        {collab.unit}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        Ativo
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-white"
                          onClick={() => handleEdit(collab)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isso excluirá
                                permanentemente o colaborador
                                {collab.name} do sistema.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(collab.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredCollaborators.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      Nenhum colaborador encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
