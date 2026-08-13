"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { isAxiosError } from "axios";
import { Eye, EyeOff, FileText, Image as ImageIcon, Trash2, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createAccessRequest } from "@/services/access-request";
import { getAllMunicipalities, getImmediateRegions, ImmediateRegion, Municipality } from "@/services/municipio";
import { AccessShell } from "./AccessShell";
import { ProfileSelector } from "./ProfileSelector";
import { ProfileType, UploadedFile, profileCopy } from "./types";

const steps = ["Dados da solicitação", "Documento", "Revisão"];
type Errors = Record<string, string>;

function Field({ label, name, value, onChange, error, type = "text" }: {
  label: string; name: string; value: string; onChange: (value: string) => void;
  error?: string; type?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-foreground">
      {label}<span className="ml-1 text-destructive">*</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        className="mt-2 h-11 w-full rounded-md border border-input bg-card px-3 text-sm font-normal outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 aria-[invalid=true]:border-destructive"
      />
      {error && <span className="mt-1 block font-normal text-destructive">{error}</span>}
    </label>
  );
}

export function RequestWizard() {
  const router = useRouter();
  const search = useSearchParams();
  const [profile, setProfile] = useState<ProfileType>(search.get("perfil") === "tecnico" ? "tecnico" : "produtor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [municipalityId, setMunicipalityId] = useState("");
  const [regionId, setRegionId] = useState("");
  const [document, setDocument] = useState<UploadedFile>();
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [regions, setRegions] = useState<ImmediateRegion[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [confirm, setConfirm] = useState(false);
  const [sending, setSending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    Promise.all([getAllMunicipalities(), getImmediateRegions()])
      .then(([allMunicipalities, immediateRegions]) => {
        if (active) {
          setMunicipalities(allMunicipalities);
          setRegions(immediateRegions);
        }
      })
      .catch(() => setErrors({ options: "Não foi possível carregar municípios e regiões." }))
      .finally(() => active && setOptionsLoading(false));
    return () => { active = false; };
  }, []);

  useEffect(() => () => {
    if (document?.preview) URL.revokeObjectURL(document.preview);
  }, [document]);

  function validateCurrentStep() {
    const nextErrors: Errors = {};
    if (step === 0) {
      if (name.trim().length < 3) nextErrors.name = "Informe o nome completo.";
      if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Informe um e-mail válido.";
      if (password.length < 8) nextErrors.password = "A senha deve ter pelo menos 8 caracteres.";
      if (password !== confirmPassword) nextErrors.confirmPassword = "As senhas não coincidem.";
      if (profile === "produtor" && !municipalityId) nextErrors.location = "Selecione um município.";
      if (profile === "tecnico" && !regionId) nextErrors.location = "Selecione uma região imediata.";
    }
    if (step === 1 && !document) {
      nextErrors.document = profile === "produtor"
        ? "Envie o documento CAF."
        : "Envie o comprovante de registro profissional (CREA ou CFTA).";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function advance() {
    if (!validateCurrentStep()) return;
    setStep((current) => Math.min(2, current + 1));
    setTimeout(() => top.current?.focus(), 0);
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type) || file.size > 10 * 1024 * 1024) {
      setErrors({ document: "Use PDF, JPG ou PNG de até 10 MB." });
      return;
    }
    setDocument({
      id: crypto.randomUUID(), name: file.name, size: file.size, type: file.type, file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    });
    setErrors({});
  }

  async function submit() {
    if (!document) return;
    setSending(true);
    setErrors({});
    try {
      const result = await createAccessRequest({
        name,
        email,
        password,
        role: profile === "produtor" ? "PRODUTOR" : "TECNICO_COOPERATIVA",
        municipioId: profile === "produtor" ? Number(municipalityId) : undefined,
        regiaoImediataId: profile === "tecnico" ? Number(regionId) : undefined,
        document: document.file,
      });
      router.push(`/solicitacao/enviada?nome=${encodeURIComponent(name)}&perfil=${profile}&protocolo=${encodeURIComponent(result.solicitation.protocol)}&email=${encodeURIComponent(email)}`);
    } catch (error) {
      const message = isAxiosError<{ message?: string | string[] }>(error) ? error.response?.data?.message : undefined;
      setErrors({ submit: Array.isArray(message) ? message.join(" ") : message || "Não foi possível enviar a solicitação." });
      setConfirm(false);
    } finally {
      setSending(false);
    }
  }

  const selectedLocation = profile === "produtor"
    ? municipalities.find((item) => String(item.id) === municipalityId)?.nome
    : regions.find((item) => String(item.regiaoImediataId) === regionId)?.regiaoImediataNome;

  return (
    <AccessShell>
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="mb-7" ref={top} tabIndex={-1}>
          <p className="text-sm font-semibold text-success">Etapa {step + 1} de 3</p>
          <h1 className="mt-2 text-3xl">{steps[step]}</h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_250px]">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
            {Object.keys(errors).length > 0 && (
              <div role="alert" className="mb-5 rounded-lg bg-destructive-soft p-3 text-sm text-destructive">
                {errors.submit || errors.options || "Confira os campos indicados antes de continuar."}
              </div>
            )}

            {step === 0 && (
              <div className="space-y-6">
                <ProfileSelector value={profile} onChange={(value) => { setProfile(value); setMunicipalityId(""); setRegionId(""); }} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nome completo" name="name" value={name} onChange={setName} error={errors.name} />
                  <Field label="E-mail" name="email" type="email" value={email} onChange={setEmail} error={errors.email} />
                  <div className="relative">
                    <Field label="Senha" name="password" type={showPassword ? "text" : "password"} value={password} onChange={setPassword} error={errors.password} />
                    <button type="button" className="absolute right-3 top-9 text-muted-foreground" onClick={() => setShowPassword(!showPassword)} aria-label="Mostrar ou ocultar senha">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <Field label="Confirmar senha" name="confirmPassword" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={setConfirmPassword} error={errors.confirmPassword} />
                </div>
                <label className="block text-sm font-semibold">
                  {profile === "produtor" ? "Município" : "Região imediata"}<span className="ml-1 text-destructive">*</span>
                  <Select
                    value={profile === "produtor" ? municipalityId : regionId}
                    onValueChange={(value) => profile === "produtor" ? setMunicipalityId(value) : setRegionId(value)}
                    disabled={optionsLoading}
                  >
                    <SelectTrigger className="mt-2 w-full font-normal" aria-invalid={Boolean(errors.location)}>
                      <SelectValue placeholder={optionsLoading ? "Carregando..." : "Selecione"} />
                    </SelectTrigger>
                    <SelectContent>
                      {profile === "produtor"
                        ? municipalities.map((item) => <SelectItem key={item.id} value={String(item.id)}>{item.nome}</SelectItem>)
                        : regions.map((item) => <SelectItem key={item.regiaoImediataId} value={String(item.regiaoImediataId)}>{item.regiaoImediataNome}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.location && <span className="mt-1 block font-normal text-destructive">{errors.location}</span>}
                </label>
              </div>
            )}

            {step === 1 && (
              <div className="rounded-xl border border-dashed border-border p-5">
                <div className="flex gap-3">
                  <UploadCloud className="mt-1 size-5 text-interactive" />
                  <div>
                    <p className="font-semibold">
                      {profile === "produtor" ? "Documento CAF" : "Comprovante de registro profissional"}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {profile === "produtor"
                        ? "Envie o Cadastro Nacional da Agricultura Familiar (CAF)."
                        : "Envie o comprovante de registro no CREA ou no CFTA."}{" "}
                      PDF, JPG ou PNG até 10 MB.
                    </p>
                  </div>
                </div>
                {document ? (
                  <div className="mt-4 flex items-center gap-3 rounded-lg bg-muted p-3">
                    {document.preview ? <ImageIcon className="text-success" /> : <FileText className="text-destructive" />}
                    <span className="min-w-0 flex-1 truncate text-sm">{document.name}</span>
                    <button type="button" onClick={() => setDocument(undefined)} className="rounded p-2 text-destructive" aria-label="Remover documento"><Trash2 size={18} /></button>
                  </div>
                ) : (
                  <label className="mt-4 inline-flex min-h-11 cursor-pointer items-center rounded-md border border-interactive px-4 text-sm font-semibold text-interactive">
                    <input className="sr-only" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFile} />Selecionar arquivo
                  </label>
                )}
                {errors.document && <p className="mt-2 text-sm text-destructive">{errors.document}</p>}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="rounded-lg border border-warning bg-warning-soft p-4 text-sm">A conta ainda não será liberada. O administrador analisará estes dados e o documento antes de aprovar o acesso.</p>
                {[
                  ["Perfil", profileCopy[profile].label], ["Solicitante", `${name} · ${email}`],
                  [profile === "produtor" ? "Município" : "Região imediata", selectedLocation || "—"],
                  [profile === "produtor" ? "Documento CAF" : "Registro profissional (CREA ou CFTA)", document?.name || "—"],
                ].map(([title, value]) => <div key={title} className="rounded-xl border border-border p-4"><h3 className="text-base">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{value}</p></div>)}
              </div>
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <Button variant="outline" disabled={step === 0} onClick={() => { setStep((current) => current - 1); setErrors({}); }}>Voltar</Button>
              {step < 2 ? <Button onClick={advance}>Continuar</Button> : <Button onClick={() => setConfirm(true)}>Enviar solicitação</Button>}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-muted p-5 lg:sticky lg:top-6">
            <p className="font-heading font-semibold">Progresso</p>
            <ol className="mt-5 space-y-4">{steps.map((item, index) => <li key={item} className={`flex gap-3 text-sm ${index === step ? "font-semibold text-interactive" : index < step ? "text-success" : "text-muted-foreground"}`}><span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-current text-xs">{index < step ? "✓" : index + 1}</span>{item}</li>)}</ol>
            <p className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">Após o envio, aguarde a decisão do administrador para entrar no sistema.</p>
          </aside>
        </div>
      </section>

      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent>
          <DialogHeader><DialogTitle>Confirmar envio?</DialogTitle><DialogDescription>A solicitação ficará pendente até a análise administrativa.</DialogDescription></DialogHeader>
          <DialogFooter><Button variant="outline" onClick={() => setConfirm(false)}>Continuar revisando</Button><Button disabled={sending} onClick={() => void submit()}>{sending ? "Enviando..." : "Confirmar e enviar"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AccessShell>
  );
}
