'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Project, Client, Proposal, Contract, ProjectShowcase } from './types'
import {
  projects as initialProjects,
  clients as initialClients,
  proposals as initialProposals,
  contracts as initialContracts,
  projectShowcases as initialShowcases,
} from './mock-data'

interface DataContextType {
  // Projects
  projects: Project[]
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => Project
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void
  getProject: (id: string) => Project | undefined

  // Clients
  clients: Client[]
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'totalProjects' | 'totalRevenue'>) => Client
  updateClient: (id: string, client: Partial<Client>) => void
  deleteClient: (id: string) => void
  getClient: (id: string) => Client | undefined

  // Proposals
  proposals: Proposal[]
  addProposal: (proposal: Omit<Proposal, 'id' | 'createdAt' | 'number'>) => Proposal
  updateProposal: (id: string, proposal: Partial<Proposal>) => void
  deleteProposal: (id: string) => void
  getProposal: (id: string) => Proposal | undefined

  // Contracts
  contracts: Contract[]
  addContract: (contract: Omit<Contract, 'id' | 'createdAt' | 'number'>) => Contract
  updateContract: (id: string, contract: Partial<Contract>) => void
  deleteContract: (id: string) => void
  getContract: (id: string) => Contract | undefined

  // Showcases
  showcases: ProjectShowcase[]
  addShowcase: (showcase: Omit<ProjectShowcase, 'id' | 'createdAt' | 'updatedAt'>) => ProjectShowcase
  updateShowcase: (id: string, showcase: Partial<ProjectShowcase>) => void
  deleteShowcase: (id: string) => void
  getShowcaseByProjectId: (projectId: string) => ProjectShowcase | undefined
}

const DataContext = createContext<DataContextType | undefined>(undefined)

const STORAGE_KEY = 'meanval_data'

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals)
  const [contracts, setContracts] = useState<Contract[]>(initialContracts)
  const [showcases, setShowcases] = useState<ProjectShowcase[]>(initialShowcases)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (data.projects) setProjects(data.projects.map((p: Project) => ({
          ...p,
          startDate: new Date(p.startDate),
          endDate: new Date(p.endDate),
          createdAt: new Date(p.createdAt),
        })))
        if (data.clients) setClients(data.clients.map((c: Client) => ({
          ...c,
          createdAt: new Date(c.createdAt),
        })))
        if (data.proposals) setProposals(data.proposals.map((p: Proposal) => ({
          ...p,
          validUntil: new Date(p.validUntil),
          createdAt: new Date(p.createdAt),
        })))
        if (data.contracts) setContracts(data.contracts.map((c: Contract) => ({
          ...c,
          signedAt: c.signedAt ? new Date(c.signedAt) : undefined,
          createdAt: new Date(c.createdAt),
        })))
        if (data.showcases) setShowcases(data.showcases.map((s: ProjectShowcase) => ({
          ...s,
          sentAt: s.sentAt ? new Date(s.sentAt) : undefined,
          viewedAt: s.viewedAt ? new Date(s.viewedAt) : undefined,
          respondedAt: s.respondedAt ? new Date(s.respondedAt) : undefined,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt),
        })))
      } catch (e) {
        console.error('Failed to load data from localStorage:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        projects,
        clients,
        proposals,
        contracts,
        showcases,
      }))
    }
  }, [projects, clients, proposals, contracts, showcases, isLoaded])

  // Project operations
  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>): Project => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date(),
    }
    setProjects((prev) => [...prev, newProject])
    return newProject
  }

  const updateProject = (id: string, projectData: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...projectData } : p))
    )
  }

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const getProject = (id: string) => projects.find((p) => p.id === id)

  // Client operations
  const addClient = (clientData: Omit<Client, 'id' | 'createdAt' | 'totalProjects' | 'totalRevenue'>): Client => {
    const newClient: Client = {
      ...clientData,
      id: `client-${Date.now()}`,
      totalProjects: 0,
      totalRevenue: 0,
      createdAt: new Date(),
    }
    setClients((prev) => [...prev, newClient])
    return newClient
  }

  const updateClient = (id: string, clientData: Partial<Client>) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...clientData } : c))
    )
  }

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id))
  }

  const getClient = (id: string) => clients.find((c) => c.id === id)

  // Proposal operations
  const addProposal = (proposalData: Omit<Proposal, 'id' | 'createdAt' | 'number'>): Proposal => {
    const proposalCount = proposals.length + 1
    const newProposal: Proposal = {
      ...proposalData,
      id: `prop-${Date.now()}`,
      number: `TEK-${new Date().getFullYear()}-${String(proposalCount).padStart(3, '0')}`,
      createdAt: new Date(),
    }
    setProposals((prev) => [...prev, newProposal])
    return newProposal
  }

  const updateProposal = (id: string, proposalData: Partial<Proposal>) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...proposalData } : p))
    )
  }

  const deleteProposal = (id: string) => {
    setProposals((prev) => prev.filter((p) => p.id !== id))
  }

  const getProposal = (id: string) => proposals.find((p) => p.id === id)

  // Contract operations
  const addContract = (contractData: Omit<Contract, 'id' | 'createdAt' | 'number'>): Contract => {
    const contractCount = contracts.length + 1
    const newContract: Contract = {
      ...contractData,
      id: `cont-${Date.now()}`,
      number: `SOZ-${new Date().getFullYear()}-${String(contractCount).padStart(3, '0')}`,
      createdAt: new Date(),
    }
    setContracts((prev) => [...prev, newContract])
    return newContract
  }

  const updateContract = (id: string, contractData: Partial<Contract>) => {
    setContracts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...contractData } : c))
    )
  }

  const deleteContract = (id: string) => {
    setContracts((prev) => prev.filter((c) => c.id !== id))
  }

  const getContract = (id: string) => contracts.find((c) => c.id === id)

  // Showcase operations
  const addShowcase = (showcaseData: Omit<ProjectShowcase, 'id' | 'createdAt' | 'updatedAt'>): ProjectShowcase => {
    const newShowcase: ProjectShowcase = {
      ...showcaseData,
      id: `showcase-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setShowcases((prev) => [...prev, newShowcase])
    return newShowcase
  }

  const updateShowcase = (id: string, showcaseData: Partial<ProjectShowcase>) => {
    setShowcases((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...showcaseData, updatedAt: new Date() } : s))
    )
  }

  const deleteShowcase = (id: string) => {
    setShowcases((prev) => prev.filter((s) => s.id !== id))
  }

  const getShowcaseByProjectId = (projectId: string) =>
    showcases.find((s) => s.projectId === projectId)

  return (
    <DataContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        getProject,
        clients,
        addClient,
        updateClient,
        deleteClient,
        getClient,
        proposals,
        addProposal,
        updateProposal,
        deleteProposal,
        getProposal,
        contracts,
        addContract,
        updateContract,
        deleteContract,
        getContract,
        showcases,
        addShowcase,
        updateShowcase,
        deleteShowcase,
        getShowcaseByProjectId,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
