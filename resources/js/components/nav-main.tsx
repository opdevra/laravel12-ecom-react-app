import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    
    const renderNavItem = (item: NavItem) => {
        // If item has children, render as collapsible
        if (item.children && item.children.length > 0) {
            return (
                <Collapsible key={item.title} asChild defaultOpen={item.children.some(child => child.url === page.url)}>
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {item.children.map((child) => (
                                    <SidebarMenuSubItem key={child.title}>
                                        <SidebarMenuSubButton asChild isActive={child.url === page.url}>
                                            <Link href={child.url} prefetch>
                                                {child.icon && <child.icon />}
                                                <span>{child.title}</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            );
        }
        
        // Regular menu item without children
        return (
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.url === page.url}>
                    <Link href={item.url} prefetch>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    };
    
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => renderNavItem(item))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
