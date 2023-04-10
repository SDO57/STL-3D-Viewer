

global using Microsoft.AspNetCore.Mvc;
global using System.Diagnostics;
global using WebApplicationMVC.Models;
global using Microsoft.EntityFrameworkCore;
using Infra.DB;
using Core.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
//builder.Services.AddDbContext<Infra.DB.STLDbContext>();
builder.Services.AddSingleton<IFileDescriptionRepository, DBRepository>();
builder.Services.AddSingleton<IFileDataRepository, FileRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
