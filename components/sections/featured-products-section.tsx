"use client";

import { FadeImage } from "@/components/fade-image";

const features = [
  {
    image: "/images/collage-1-voice-ai-pipeline.jpg",
    alt: "Speech-to-text service feeding an LLM reasoning engine and text-to-speech synthesis",
    span: "col-span-2 row-span-2", // Large
  },
  {
    image: "/images/collage-2-rbac-agent-permissions.jpg",
    alt: "User request checked by an RBAC engine before granting agent tool permissions",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "/images/collage-3-oidc-enterprise-sso.jpg",
    alt: "API gateway routing through an OIDC authenticator to enterprise SSO",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "/images/collage-4-datadog-metrics.jpg",
    alt: "Streaming service layer feeding a metrics pipeline into a Datadog dashboard",
    span: "col-span-1 row-span-2", // Tall
  },
  {
    image: "/images/collage-5-contextual-retrieval.jpg",
    alt: "Intent classifier and contextual retrieval layer querying an institutional database",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "/images/collage-6-event-stream-warehouse.jpg",
    alt: "Event stream processed by a distributed engine into a data warehouse",
    span: "col-span-2 row-span-1", // Wide
  },
  {
    image: "/images/collage-7-ml-dispute-fraud.jpg",
    alt: "Transaction queue scored by an ML dispute classifier and routed to a fraud review queue",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "/images/collage-8-sftp-hitl-retraining.jpg",
    alt: "Production logs sent over SFTP for human-in-the-loop model retraining",
    span: "col-span-1 row-span-2", // Tall
  },
  {
    image: "/images/collage-9-gitops-cloud-cluster.jpg",
    alt: "GitOps pipeline applying infrastructure as code to a cloud cluster",
    span: "col-span-2 row-span-1", // Wide
  },
  {
    image: "/images/collage-10-fbdi-enterprise-crm.jpg",
    alt: "Backend extraction service loading data through an FBDI interface into an enterprise CRM",
    span: "col-span-1 row-span-1", // Small
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="technology" className="relative bg-background py-20 md:py-32">
      <div className="px-4 md:px-12 lg:px-20">
        <p className="mb-8 text-center text-sm uppercase tracking-[0.2em] text-muted-foreground">
          This is the Featured Products section
        </p>

        {/* Bento Grid: rows are 0.7× the column width so every tile matches its image's proportions. */}
        <div className="@container mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full auto-rows-[calc((100cqw-0.75rem)/2*0.7)] md:auto-rows-[calc((100cqw-3rem)/4*0.7)]">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-lg border border-gray-200 bg-[#f7f8fb] ${feature.span}`}
            >
              <FadeImage
                src={feature.image || "/placeholder.svg"}
                alt={feature.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
